import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SscgiService } from '../../sscgi.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DataPrivacyModalComponent } from './data-privacy-modal/data-privacy-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'sscgi-dynamic-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.css']
})
export class DynamicPageComponent implements OnInit, OnDestroy {

  pages: Array<{ name: string, component: string, styles: string }> = [];
  safeBodies: SafeHtml[] = [];
  private buttonClickHandler: (event: Event) => void;
  private pagesLoaded: boolean = false; // Flag to track loading status

  constructor(
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private service: SscgiService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        // Existing logic for URL matching
        if (this.urlContainsHome(event.urlAfterRedirects)) {
          this.resetPageState();
          this.loadPages();
        }

        // Modal opening logic - only for /career URL
        const currentUrl = event.urlAfterRedirects.toLowerCase(); // Make case-insensitive match
        if (currentUrl === '/career' || currentUrl === '/contactus') {
          this.openCareerModal(); // Open modal only if the URL is '/career'
        }
      });
  }

  ngOnDestroy(): void {
    if (this.buttonClickHandler) {
      document.removeEventListener('click', this.buttonClickHandler);
    }
  }


  openCareerModal(): void {
    const dialogRef = this.dialog.open(DataPrivacyModalComponent, {
      disableClose: true,   
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal closed', result);
    });
  }

  private resetPageState() {
    this.pages = [];
    this.safeBodies = [];
    this.pagesLoaded = false; // Mark pages as not loaded
  }

  // Check if the URL contains 'home'
  private urlContainsHome(url: string): boolean {
    return url.includes('home');
  }

  private loadPages() {
    this.pages = [];
    this.safeBodies = [];

    if (this.pagesLoaded) return;
    this.service.getPages().subscribe(
      data => {
        const displayedPages = data
          .filter(page => page.isDisplay === true)

        // Only set pages if they were changed
        if (JSON.stringify(this.pages) !== JSON.stringify(displayedPages)) {
          this.pages = displayedPages;
          this.safeBodies = this.pages.map(page =>
            this.sanitizer.bypassSecurityTrustHtml(page.component)
          );

          this.injectStyles();
          this.addButtonEventListeners();
          this.pagesLoaded = true;
        }
      });
  }

  private injectStyles(): void {
    const oldStyle = document.getElementById('dynamic-page-styles');
    if (oldStyle) {
      oldStyle.remove();
    }

    const styleElement = this.renderer.createElement('style');
    styleElement.id = 'dynamic-page-styles';
    const allStyles = this.pages.map(page => page.styles).join(' ');
    styleElement.textContent = allStyles;

    this.renderer.appendChild(document.head, styleElement);
  }

  private addButtonEventListeners() {
    this.buttonClickHandler = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON') {
        const redirectUrl = target.getAttribute('redirect_url');
        const openInNewWindow = target.hasAttribute('open_in_new_window');
        if (redirectUrl) {
          if (openInNewWindow) {
            window.open(redirectUrl, '_blank');
          } else {
            // Handle internal Angular navigation
            this.router.navigate([redirectUrl]).then(() => {
              this.safeBodies = null;
              this.pages = null;
            });
          }
        } else {
          console.error('No valid redirect URL found.');
        }
      }
    };
    document.addEventListener('click', this.buttonClickHandler);
  }
}
