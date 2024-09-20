import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-nav-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './nav-page.component.html',
  styleUrl: './nav-page.component.css'
})
export class NavPageComponent implements OnInit, OnDestroy {
  pageName: string;
  pageContent: Array<{ name: string, component: string, styles: string, navigateTo?: string }>; // Include navigateTo if available
  safeBody: SafeHtml;
  api = "https://localhost:7258/Page/"
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
      this.pageName = params.get('name');
      console.log('Pagename:', this.pageName);
      this.loadPageContent(this.pageName);
    });
  }

  ngOnDestroy(): void {
    // Clean up any event listeners or handlers
    if (this.buttonClickHandler) {
      document.removeEventListener('click', this.buttonClickHandler);
    }
  }

  private loadPageContent(pageName: string) {
    this.http.get<any>(this.api + "getPages").subscribe(
      (response) => {
        const page = response.find(p => p.name === pageName);

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
        } else {
          console.error('Page not found:', pageName);
        }
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
            this.pageContent = [];
            this.safeBody = [];
          } else {
            // Handle internal Angular navigation
            this.router.navigate([redirectUrl]).then(() => {
              this.pageContent = [];
              this.safeBody = [];
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
