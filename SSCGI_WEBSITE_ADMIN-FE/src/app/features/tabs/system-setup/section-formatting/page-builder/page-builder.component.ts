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
    isDisplay: any;
    pageOrder: any;
    url: string; id: string; name: string; component: string; styles: string
  }[] = [];
  private currentPageIndex: number = 0;
  api = "https://localhost:7258/Page/"

  constructor(private http: HttpClient, private router: Router) { }

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

      this.editor.Panels.addButton('options', {
        id: 'edit-page-order',
        className: 'fa fa-edit', // Change the icon as needed
        command: 'edit-page-order',
        attributes: { title: 'Edit Page Order' }
      });

      this.editor.Panels.addButton('options', {
        id: 'edit-page-status',
        className: 'fa fa-toggle-off', // Change the icon as needed
        command: 'edit-page-status',
        attributes: { title: 'Edit Page Status' }
      });

      this.editor.Commands.add('edit-page-status', {
        run: () => this.updatePageStatus()
      })

      this.editor.Commands.add('edit-page-order', {
        run: () => this.editPageOrder()
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

      this.editor.TraitManager.addType('custom-select', {
        extend: 'select',
        events: {
          change({ target }) {
            const { value } = target;
            const { model } = this;
            const traits = model.get('traits');

            // Clear existing traits
            traits.each(trait => {
              if (trait.get('type') !== 'custom-select') {
                traits.remove(trait);
              }
            });

            // Add new traits based on selected value
            if (value === 'option1') {
              traits.add([
                {
                  type: 'text',
                  label: 'Text Trait',
                  name: 'text_trait',
                },
                {
                  type: 'number',
                  label: 'Number Trait',
                  name: 'number_trait',
                },
              ]);
            } else if (value === 'option2') {
              traits.add([
                {
                  type: 'color',
                  label: 'Color Trait',
                  name: 'color_trait',
                },
                {
                  type: 'select',
                  label: 'Select Trait',
                  name: 'select_trait',
                  options: [
                    { value: 'a', name: 'Option A' },
                    { value: 'b', name: 'Option B' },
                  ],
                },
              ]);
            }
          },
        },
      });
      this.addCustomTraits(); // Ensure traits are added after the editor is initialized
      this.bindRedirectFunction();
      this.addCursorStyle();
      this.loadPagesFromDB();


    });


  }

  private bindRedirectFunction() {
    (window as any).handleRedirectFromGrapesJS = (pageName: string, openInNewWindow: boolean) => {
      this.handleRedirect(pageName, openInNewWindow);
    };
  }
  private loadPagesFromDB() {
    this.http.get<any[]>(this.api + "getPages").subscribe(
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

  private loadPages() {
    this.http.get<any[]>(this.api + "getPages").subscribe(
      (pages) => {
        this.pages = pages;
        this.addCustomTraits(); // Ensure traits are updated with new pages
      },
      (error) => {
        console.error('Error loading pages:', error);
      }
    );
  }

  private addCustomTraits() {
    const editor = this.editor;

    editor.on('component:selected', (model) => {
      const selected = editor.getSelected();
      if (selected && selected.get('type') === 'button') {
        // Add or update the custom traits for the selected button component
        selected.set({
          traits: this.getUpdatedTraits()
        });
        editor.TraitManager.render();

      }
    });
  }

  private getUpdatedTraits() {
    // Retrieve existing traits for the button component
    const existingTraits = this.editor.Components.getType('button').model.prototype.defaults.traits || [];
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
          } else {
            console.error('No button selected or component is not of type "button".');
          }
        }
      }

    ];

    // Return the combined list of filtered existing traits and new traits
    return [...existingTraits, ...newTraits];
  }


  private handleRedirect(redirectUrl: string, openInNewWindow: boolean) {
    if (openInNewWindow) {
      window.open(`/page/${redirectUrl}`, '_blank');
    } else {
      this.router.navigate(['/page', redirectUrl]);
    }
  }

  private getPageOptions() {
    const pageOptions = this.pages.map(page => ({
      value: page.name,
      name: page.name
    }));
    return pageOptions;
  }

  private loadPage(index: number) {
    this.currentPageIndex = index;
    const page = this.pages[index];
    if (page) {
      this.editor.setComponents(page.component || '<div>No content</div>');
      this.editor.setStyle(page.styles || '/* No styles */');
    } else {
      console.error('Page not found at index:', index);
    }
  }

  private editPageOrder() {
    const currentPage = this.pages[this.currentPageIndex];

    // Create a list of pages displaying their names and pageOrder
    const pageList = this.pages.map(page => `${page.pageOrder}: ${page.name}`).join('\n');

    // Prompt for new order with the list displayed above
    const newOrderInput = prompt(
      `Current page order is ${currentPage.pageOrder}. Enter new order for "${currentPage.name}":\n\n${pageList}`,
      `${currentPage.pageOrder}`
    );

    const newOrder = newOrderInput ? parseInt(newOrderInput, 10) : currentPage.pageOrder;

    if (!isNaN(newOrder) && newOrder !== currentPage.pageOrder) {
      // Update current page order
      currentPage.pageOrder = newOrder;

      // Update the order in the backend
      this.http.put(this.api + "updatePageOrder/" + currentPage.id, { pageOrder: newOrder }).subscribe(
        () => {
          alert("Page order has been changed")
          this.loadPages(); // Reload pages to reflect changes
        },
        (error) => {
          console.error('Error updating page order:', error);
          alert('An error occurred while updating the page order.');
        }
      );
    }
  }



  private savePage() {
    const pageHtml = this.editor.getHtml();
    const pageCss = this.editor.getCss();
    const currentPage = this.pages[this.currentPageIndex];

    const updatedPage = {
      component: pageHtml,
      styles: pageCss
    };

    this.http.put(this.api + "updatePage/" + currentPage.id, updatedPage).subscribe(
      (response) => {
        console.log(updatedPage)
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

    if (!pageName) return; // Exit if no name is provided
    const isDisplayInput = confirm('Should this page be displayed? Click OK for Yes or Cancel for No.');
    const isDisplay = isDisplayInput ? true : false;

    const newPage = {
      name: pageName,
      component: '',
      styles: '',
      isDisplay: isDisplay
    };

    this.http.post(this.api + "createPages", newPage).subscribe(
      (response: any) => {
        this.pages.push(response);
        this.currentPageIndex = this.pages.length - 1;
        this.loadPage(this.currentPageIndex);
        this.loadPages();
      },
      (error) => {
        console.error('Error adding page:', error);
      }
    );
  }

  private updatePageStatus() {
    const currentPage = this.pages[this.currentPageIndex];
    const currentStatus = currentPage.isDisplay ? 'Visible (1)' : 'Hidden (0)';

    // Display current status and options
    const newStatusInput = prompt(`Current display status is ${currentStatus}.\nEnter new status (1 for Visible, 0 for Hidden):`, currentPage.isDisplay ? '1' : '0');

    if (newStatusInput !== null) {
      const newStatus = newStatusInput === '1'; // Convert input to boolean

      if (newStatus !== currentPage.isDisplay) {
        currentPage.isDisplay = newStatus;

        // Update the status in the backend
        this.http.put(this.api + "updateStatus/" + currentPage.id, { isDisplay: newStatus }).subscribe(
          () => {
            alert('Page display status updated successfully!');
            this.loadPages(); // Reload pages to reflect changes
          },
          (error) => {
            console.error('Error updating page status:', error);
            alert('An error occurred while updating the page status.');
          }
        );
      } else {
        alert('No change in status.');
      }
    }
  }

  private deletePage() {
    if (this.pages.length <= 1) {
      alert('Cannot delete the last page.');
      return;
    }

    const confirmDelete = confirm(`Are you sure you want to delete "${this.pages[this.currentPageIndex].name}"?`);
    if (!confirmDelete) return;

    this.http.delete(`${this.api + "deletePage"}/${this.pages[this.currentPageIndex].id}`).subscribe(
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
    // Create a list of pages displaying their names and pageOrder
    const pageList = this.pages.map(page => `${page.pageOrder}: ${page.name}`).join('\n');
    const pageOrderInput = prompt(`Select a page by its order:\n${pageList}`);

    if (pageOrderInput) {
      const selectedPageOrder = parseInt(pageOrderInput, 10);

      // Find the page index by its pageOrder
      const selectedPageIndex = this.pages.findIndex(page => page.pageOrder === selectedPageOrder);

      if (selectedPageIndex !== -1) {
        this.switchPage(selectedPageIndex);
      } else {
        alert('Invalid page order selected. Please try again.');
      }
    }
  }


  private switchPage(index: number) {
    const currentHtml = this.editor.getHtml();
    const currentCss = this.editor.getCss();
    this.pages[this.currentPageIndex] = { ...this.pages[this.currentPageIndex], component: currentHtml, styles: currentCss };
    this.loadPage(index);
  }


  private addCursorStyle() {
    const styleManager = this.editor.StyleManager;

    styleManager.addSector('cursor', {
      name: 'Cursor',
      open: false,
      buildProps: ['cursor'],
      properties: [
        {
          type: 'select',
          name: 'Cursor Style',
          property: 'cursor',
          options: [
            { value: 'default', name: 'Default' },
            { value: 'pointer', name: 'Pointer' },
            { value: 'crosshair', name: 'Crosshair' },
            { value: 'move', name: 'Move' },
            { value: 'text', name: 'Text' },
            { value: 'wait', name: 'Wait' },
            { value: 'help', name: 'Help' },
            { value: 'not-allowed', name: 'Not Allowed' }
          ]
        }
      ]
    });
  }
}
