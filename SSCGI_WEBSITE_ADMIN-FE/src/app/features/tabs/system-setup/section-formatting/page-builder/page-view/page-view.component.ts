import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./page-view.component.css']
})
export class PageViewComponent implements OnInit, OnDestroy {
  pageId: string;
  pageContent: { name: string, component: string, styles: string, navigateTo?: string }; // Include navigateTo if available
  safeBody: SafeHtml;
  private buttonClickHandler: (event: Event) => void;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pageId = params.get('id');
      console.log('Page ID:', this.pageId);
      this.loadPageContent(this.pageId);
    });
  }

  ngOnDestroy(): void {
    // Clean up any event listeners or handlers
    if (this.buttonClickHandler) {
      document.removeEventListener('click', this.buttonClickHandler);
    }
  }

  private loadPageContent(pageId: string) {
    this.http.get<any>(`http://localhost:3000/pages/${pageId}`).subscribe(
      (page) => {
        this.pageContent = page;
        this.safeBody = this.sanitizer.bypassSecurityTrustHtml(page.component);

        // Inject styles dynamically
        const styleElement = this.renderer.createElement('style');
        styleElement.textContent = page.styles;
        this.renderer.appendChild(document.head, styleElement);

        // Clean up old event listeners and add new ones
        this.addButtonEventListeners();
      },
      (error) => {
        console.error('Error loading page content:', error);
      }
    );
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
              // After navigation, no need to reapply event listeners as they are managed by delegation
            });
          }
        } else {
          console.error('No valid redirect URL found.');
        }
      }
    };
    
    // Use event delegation by listening on the document
    document.addEventListener('click', this.buttonClickHandler);
  }
}
