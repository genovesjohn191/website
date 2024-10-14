import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SscgiService } from '../../../sscgi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-privacy-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-privacy-modal.component.html',
  styleUrl: './data-privacy-modal.component.css'
})
export class DataPrivacyModalComponent implements OnInit, OnDestroy {

  pageContent: Array<{ name: string, component: string, styles: string, navigateTo?: string }>; 
  safeBody: SafeHtml;
  private buttonClickHandler: (event: Event) => void;
  private pagesLoaded: boolean = false; // Flag to track loading status

  constructor(
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private service: SscgiService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private dialogref: MatDialogRef<DataPrivacyModalComponent>
  ) { }

  ngOnInit(): void {
    this.loadPages();
  }

  
  ngOnDestroy(): void {
    if (this.buttonClickHandler) {
      document.removeEventListener('click', this.buttonClickHandler);
    }
  }



  private loadPages() {
    this.service.getDataPrivacyPage().subscribe(
      (response) => {
        const page = response[0];

        if (page) {
          this.pageContent = page;
          this.safeBody = this.sanitizer.bypassSecurityTrustHtml(page.component);

          // Remove old style element if exists
          const oldStyle = document.getElementById('dynamic-page-styles');
          if (oldStyle) {
            oldStyle.remove();
          }

          // Inject styles dynamically
          const styleElement = this.renderer.createElement('style');
          styleElement.id = 'dynamic-page-styles';
          styleElement.textContent = page.styles;
          this.renderer.appendChild(document.head, styleElement);

          // Clean up old event listeners and add new ones
          this.addButtonEventListeners();
        }

      }
    );
  }
  private addButtonEventListeners() {
    this.buttonClickHandler = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON') {
        this.dialogref.close();
        const redirectUrl = target.getAttribute('redirect_url');
        const openInNewWindow = target.hasAttribute('open_in_new_window');

        if (redirectUrl) {
          if (openInNewWindow) {
            window.open(this.router.serializeUrl(this.router.createUrlTree([redirectUrl])), '_blank');
          } else {
            this.router.navigate([redirectUrl]).then(() => {
              this.pageContent = [];
              this.safeBody = [];
            });
          }
        }

      }
    };
    document.addEventListener('click', this.buttonClickHandler);
  }

}
