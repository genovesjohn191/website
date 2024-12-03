import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-blocks-basic';
import gjsForms from 'grapesjs-plugin-forms';
import { CRUDmodalComponent } from '../../../../shared/components/crudmodal/crudmodal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageBuilderService } from '../page-builder.service';

@Component({
  selector: 'app-data-privacy-editor',
  standalone: true,
  imports: [],
  templateUrl: './data-privacy-editor.component.html',
  styleUrl: './data-privacy-editor.component.css'
})
export class DataPrivacyEditorComponent implements OnInit {
  private editor: any;
  pageOption: any;
  private pages: {
    isDisplay: any;
    pageOrder: any;
    url: string; id: string; name: string; component: string; styles: string
  }[] = [];
  private currentPageIndex: number = 0;
  constructor(private service: PageBuilderService, private http: HttpClient, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

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
        id: 'edit-page-status',
        className: 'fa fa-toggle-off', // Change the icon as needed
        command: 'edit-page-status',
        attributes: { title: 'Edit Page Status' }
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
      this.loadPagesOptions();


    });


  }

  private bindRedirectFunction() {
    (window as any).handleRedirectFromGrapesJS = (pageName: string, openInNewWindow: boolean) => {
      this.handleRedirect(pageName, openInNewWindow);
    };
  }
  private loadPagesFromDB() {

    this.service.getDataPrivacyPage().subscribe(data => {
      this.pages = data;
      this.addCustomTraits(); // Ensure traits are updated with new pages
      if (this.pages.length > 0) {
        this.loadPage(0); // Load the first page by default
      }
    },
      (error) => {
        console.error('Error loading pages:', error);
      });


    // this.http.get<any[]>(this.api + "getDataPrivacyPage").subscribe(
    //   (pages) => {
    //     this.pages = pages;
    //     this.addCustomTraits(); // Ensure traits are updated with new pages
    //     if (this.pages.length > 0) {
    //       this.loadPage(0); // Load the first page by default
    //     }
    //   },
    //   (error) => {
    //     console.error('Error loading pages:', error);
    //   }
    // );
  }

  private loadPagesOptions() {

    this.service.getPages().subscribe(data => {
      this.pageOption = data;
      this.addCustomTraits(); // Ensure traits are updated with new pages
      if (this.pages.length > 0) {
        this.loadPage(0); // Load the first page by default
      }

    },
      (error) => {
        console.error('Error loading pages:', error);
      })
    // this.http.get<any[]>(this.api + "getPages").subscribe(
    //   (pages) => {
    //     this.pageOption = pages;
    //     this.addCustomTraits(); // Ensure traits are updated with new pages
    //     if (this.pages.length > 0) {
    //       this.loadPage(0); // Load the first page by default
    //     }
    //   },
    //   (error) => {
    //     console.error('Error loading pages:', error);
    //   }
    // );
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
      window.open(this.router.serializeUrl(this.router.createUrlTree([redirectUrl])), '_blank');
    } else {
      this.router.navigate(['/page', redirectUrl]);
    }
  }

  private getPageOptions() {
    const pageOptions = this.pageOption.map(page => ({
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


  private savePage() {
    const pageHtml = this.editor.getHtml();
    const pageCss = this.editor.getCss();
    const currentPage = this.pages[this.currentPageIndex];
    console.log(currentPage)

    const dialogRef = this.dialog.open(CRUDmodalComponent, {
      width: '400px',
      data: {
        mode: '',
        module: 'Are you sure to save the page?',
        form: {
          fields: [

          ]
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedPage = {
          component: pageHtml,
          styles: pageCss,
          isDisplay: currentPage.isDisplay
        };

        this.service.updateDataPrivacyPage(currentPage.id, updatedPage).subscribe(data => {
          this.showSnackBar("Page saved successfully");
        },
          (error) => {
            this.showSnackBar('Error saving page:');

          })

        // this.http.put(this.api + "updateDataPrivacyPage/" + currentPage.id, updatedPage).subscribe(
        //   (response) => {
        //     this.showSnackBar("Page saved successfully");

        //   },
        //   (error) => {
        //     this.showSnackBar('Error saving page:');

        //   }
        // );
      } else {
        this.showSnackBar("Save action canceled");
      }
    });
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


  showSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
