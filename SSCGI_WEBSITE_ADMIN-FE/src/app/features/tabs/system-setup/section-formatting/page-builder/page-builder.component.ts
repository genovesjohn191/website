import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-blocks-basic';
import gjsForms from 'grapesjs-plugin-forms';

@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.css']
})
export class PageBuilderComponent implements OnInit {
  private editor: any;
  private pages: {
    url: string; id: string; name: string; component: string; styles: string 
  }[] = [];
  private currentPageIndex: number = 0;
  projectID = 1;
  projectEndpoint = `http://localhost:3000/projects/${this.projectID}`;
  pagesEndpoint = `http://localhost:3000/pages`;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.editor = grapesjs.init({
      container: '#gjs',
      plugins: [plugin, gjsForms],
      pluginsOpts: {},
      storageManager: { type: 'inline' },
    });

    this.editor.on('load', () => {
      this.editor.Panels.addButton('options', {
        id: 'save-page',
        className: 'fa fa-save',
        command: 'save-page',
        attributes: { title: 'Save Page' }
      });

      this.editor.Panels.addButton('options', {
        id: 'switch-page',
        className: 'fa fa-refresh',
        command: 'switch-page',
        attributes: { title: 'Switch Page' }
      });

      this.editor.Panels.addButton('options', {
        id: 'add-page',
        className: 'fa fa-plus',
        command: 'add-page',
        attributes: { title: 'Add Page' }
      });

      this.editor.Panels.addButton('options', {
        id: 'delete-page',
        className: 'fa fa-trash',
        command: 'delete-page',
        attributes: { title: 'Delete Page' }
      });

      this.editor.Commands.add('switch-page', {
        run: () => this.switchPagePrompt()
      });

      this.editor.Commands.add('add-page', {
        run: () => this.addPage()
      });

      this.editor.Commands.add('delete-page', {
        run: () => this.deletePage()
      });

      this.editor.Commands.add('save-page', {
        run: () => this.savePage()
      });

      this.addCustomTraits(); // Ensure traits are added after the editor is initialized
    });

    this.bindRedirectFunction();
    this.loadPagesFromDB();
  }

  private bindRedirectFunction() {
    (window as any).handleRedirectFromGrapesJS = (pageName: string, openInNewWindow: boolean) => {
      this.handleRedirect(pageName, openInNewWindow);
    };
    console.log('handleRedirectFromGrapesJS function bound to window.'); // Debug log
  }
  private loadPagesFromDB() {
    this.http.get<any[]>(this.pagesEndpoint).subscribe(
      (pages) => {
        this.pages = pages;
        this.addCustomTraits(); // Ensure traits are updated with new pages
        if (this.pages.length > 0) {
          this.loadPage(0); // Load the first page by default
        }
      },
      (error) => {
        console.error('Error loading pages:', error);
      }
    );
  }

 private addCustomTraits() {
    this.editor.Components.addType('button', {
      model: {
        defaults: {
          traits: this.getUpdatedTraits()
        }
      }
    });
  }

  private getUpdatedTraits() {
    // Retrieve existing traits for the button component
    const existingTraits = this.editor.Components.getType('button').model.prototype.defaults.traits || [];

    // Filter out the trait with type 'text' (or any other trait you want to remove)
    const filteredTraits = existingTraits.filter(trait => trait.type !== 'text');

    // Define new traits
    const newTraits = [
      {
        type: 'select',
        label: 'Redirect Page',
        name: 'redirect_url',
        options: this.getPageOptions(),
        change: (event: any) => {
          const button = this.editor.getSelected();
          if (button && button.get('type') === 'button') {
            button.setAttributes({ 'data-redirect-url': event.target.value });
            console.log(`Updated button redirect URL to: ${event.target.value}`);
          } else {
            console.error('No button selected or component is not of type "button".');
          }
        }
      },
      {
        type: 'select',
        label: 'Open in New Window',
        name: 'open_in_new_window',
        options: [
          { value: 'true', name: 'Yes' },
          { value: 'false', name: 'No' }
        ],
        change: (event: any) => {
          const button = this.editor.getSelected();
          if (button && button.get('type') === 'button') {
            button.setAttributes({ 'data-open-in-new-window': event.target.value });
            console.log(`Updated button to open in new window: ${event.target.value}`);
          } else {
            console.error('No button selected or component is not of type "button".');
          }
        }
      }
    ];

    // Return the combined list of filtered existing traits and new traits
    return [...filteredTraits, ...newTraits];
  }
  

  private handleRedirect(redirectUrl: string, openInNewWindow: boolean) {
    console.log('Handling redirect to:', redirectUrl);
  
    if (openInNewWindow) {
      window.open(`/page/${redirectUrl}`, '_blank');
    } else {
      this.router.navigate(['/page', redirectUrl]);
    }
  }
  

  private updateButtonRedirectUrl(selectedPageName: string) {
    const button = this.editor.getSelected();
    if (button && button.get('type') === 'button') {
      button.setAttributes({ 'data-redirect-url': selectedPageName });
      console.log(`Updated button redirect URL to: ${selectedPageName}`);
    } else {
      console.error('No button selected or component is not of type "button".');
    }
  }

  private getPageOptions() {
    return this.pages.map(page => ({
      value: page.id, // Use page name as value
      name: page.name // Use page name as the display name
    }));
  }

  private loadPage(index: number) {
    this.currentPageIndex = index;
    const page = this.pages[index];
    this.editor.setComponents(page.component);
    this.editor.setStyle(page.styles);
  }

  private savePage() {
    const pageHtml = this.editor.getHtml();
    const pageCss = this.editor.getCss();
    const currentPage = this.pages[this.currentPageIndex];

    const updatedPage = {
      id: currentPage.id,
      name: currentPage.name,
      component: pageHtml,
      styles: pageCss
    };

    this.http.put(`${this.pagesEndpoint}/${currentPage.id}`, updatedPage).subscribe(
      (response) => {
        console.log('Page saved:', response);
        alert('Page saved successfully!');
      },
      (error) => {
        console.error('Error saving page:', error);
        alert('An error occurred while saving the page.');
      }
    );
  }

  private addPage() {
    const pageName = prompt('Enter a name for the new page:', `Page ${this.pages.length + 1}`);
    if (!pageName) return;

    const newPage = {
      id: `page-${this.pages.length + 1}`,
      name: pageName,
      component: '',
      styles: ''
    };

    this.http.post(this.pagesEndpoint, newPage).subscribe(
      (response: any) => {
        console.log('Page added:', response);
        this.pages.push(response);
        this.currentPageIndex = this.pages.length - 1;
        this.loadPage(this.currentPageIndex);
      },
      (error) => {
        console.error('Error adding page:', error);
      }
    );
  }

  private deletePage() {
    if (this.pages.length <= 1) {
      alert('Cannot delete the last page.');
      return;
    }

    const confirmDelete = confirm(`Are you sure you want to delete "${this.pages[this.currentPageIndex].name}"?`);
    if (!confirmDelete) return;

    this.http.delete(`${this.pagesEndpoint}/${this.pages[this.currentPageIndex].id}`).subscribe(
      () => {
        this.pages.splice(this.currentPageIndex, 1);
        this.currentPageIndex = Math.max(0, this.currentPageIndex - 1);
        this.loadPage(this.currentPageIndex);
      },
      (error) => {
        console.error('Error deleting page:', error);
      }
    );
  }

  private switchPagePrompt() {
    const pageList = this.pages.map((page, index) => `${index + 1}: ${page.name}`).join('\n');
    const pageIndex = prompt(`Select a page:\n${pageList}`, `${this.currentPageIndex + 1}`);
    if (pageIndex && !isNaN(+pageIndex) && +pageIndex > 0 && +pageIndex <= this.pages.length) {
      this.switchPage(+pageIndex - 1);
    }
  }

  private switchPage(index: number) {
    const currentHtml = this.editor.getHtml();
    const currentCss = this.editor.getCss();
    this.pages[this.currentPageIndex] = { ...this.pages[this.currentPageIndex], component: currentHtml, styles: currentCss };
    this.loadPage(index);
  }
}
