import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-blocks-basic';
import gjsForms from 'grapesjs-plugin-forms';
import { CRUDmodalComponent } from '../../../../../shared/components/crudmodal/crudmodal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageBuilderService } from '../../page-builder.service';
import Swiper from 'swiper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-builder',
  standalone: true,
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.css'],
  imports: [CommonModule]
})
export class PageBuilderComponent implements OnInit {
  private editor: any;
  isLoading = false;
  private pages: {
    isDisplay: any;
    pageOrder: any;
    url: string; id: string; name: string; component: string; styles: string
  }[] = [];
  private currentPageIndex: number = 0;


  constructor(private service: PageBuilderService, private http: HttpClient, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getImages();
    this.editor = grapesjs.init({
      container: '#gjs',
      plugins: [plugin, gjsForms],
      pluginsOpts: {},
      storageManager: { type: 'inline' },
      assetManager: {
        assets: [], // Initially empty, will be populated from the server

        upload: this.service.pageBaseUrl + 'upload', // Upload endpoint
        uploadName: 'file', // The POST field name for file uploads

        headers: {
          'accept': '*/*',
        },

        // Custom file upload logic
        uploadFile: (e) => {
          const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
          const formData = new FormData();

          // Append the selected file to formData
          formData.append('file', files[0], files[0].name);

          this.isLoading = true;
          // Use fetch to send the file to the server
          fetch( this.service.pageBaseUrl + 'upload', {
            method: 'POST',
            headers: {
              'accept': '*/*',
            },
            body: formData
          })
            .then(response => response.json())
            .then(result => {
              // Assuming the server responds with the file path
              const uploadedFileUrl = result.filePath;

              // Create an asset object
              const asset = {
                type: 'image', // Specify that this is an image
                src: uploadedFileUrl,  // The URL to the uploaded image
                name: files[0].name,   // Optional: name of the image
              };

              // Add the new asset to the asset manager
              this.editor.AssetManager.add(asset);

              // Optionally, add the image to the canvas (if you want it displayed immediately)
              this.editor.addComponents(`<img src="${uploadedFileUrl}" alt="${files[0].name}"/>`);

              this.isLoading = false;
              this.getImages();
            })
            .catch(error => {
              console.error('Error uploading file:', error);
              this.isLoading = false;
            });
        }
      },

      // Other editor options
    });



    this.editor.BlockManager.add('swiper-carousel-block', {
      label: 'Swiper Carousel',
      content: `
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="https://via.placeholder.com/300x150" alt="Slide 1" />
              <h2>Slide 1 Title</h2>
              <p>Description for Slide 1</p>
            </div>
            <div class="swiper-slide">
              <img src="https://via.placeholder.com/300x150" alt="Slide 2" />
              <h2>Slide 2 Title</h2>
              <p>Description for Slide 2</p>
            </div>
            <div class="swiper-slide">
              <img src="https://via.placeholder.com/300x150" alt="Slide 3" />
              <h2>Slide 3 Title</h2>
              <p>Description for Slide 3</p>
            </div>
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      `,
      category: 'Components',
      droppable: true,
      draggable: true,
      script: function () {
        const swiper = new Swiper('.swiper-container', {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      },
    });

    // Step 2: Style the Swiper Carousel
    const styles = `
      .swiper-container {
        width: 100%;
        height: 300px;
      }
    
      .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        background: #fff;
      }
    
      .swiper-slide img {
        width: 100%;
        height: auto;
        border-radius: 10px;
      }
    
      .swiper-button-next, .swiper-button-prev {
        color: #000;
      }
    `;

    // Append styles to the document
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Step 3: Add Swiper CSS and JS
    const addSwiperResources = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/swiper/swiper-bundle.min.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/swiper/swiper-bundle.min.js';
      document.body.appendChild(script);
    };



    this.editor.on('load', () => {
      addSwiperResources();
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

  private getImages() {
    this.service.getImages().subscribe(
      response => {
        // Assuming response is an array of image URLs
        // Clear existing assets before adding new ones
        this.editor.AssetManager.clear(); // Clear existing assets
        response.forEach(imageUrl => {
          // Check if the image URL is valid (optional validation)
          if (this.isValidImageUrl(imageUrl)) {
            this.editor.AssetManager.add({
              type: 'image',
              src: imageUrl,
            });
          }
        });
      },
      error => {
        console.error('Error loading initial assets:', error);
      }
    );
  }

  // Optional: Function to validate if the URL points to a valid image
  private isValidImageUrl(url: string): boolean {
    return /\.(jpeg|jpg|gif|png|svg)$/.test(url); // Adjust extensions as needed
  }

  private bindRedirectFunction() {
    (window as any).handleRedirectFromGrapesJS = (pageName: string, openInNewWindow: boolean) => {
      this.handleRedirect(pageName, openInNewWindow);
    };
  }
  private loadPagesFromDB() {
    this.service.getPages().subscribe(data => {
      this.pages = data;
      this.addCustomTraits(); // Ensure traits are updated with new pages
      if (this.pages.length > 0) {
        this.loadPage(0); // Load the first page by default
      }

    })
  }

  private loadPages() {
    this.service.getPages().subscribe(data => {
      this.pages = data;
      this.addCustomTraits(); // Ensure traits are updated with new pages


    })
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

    // Create a list of pages displaying their names and pageOrder as an array of objects for the select dropdown
    const pageList = this.pages.map(page => ({
      label: `${page.pageOrder}: ${page.name}`,  // Display order and name in the dropdown
      value: page.pageOrder                     // Use pageOrder as the value
    }));

    const dialogRef = this.dialog.open(CRUDmodalComponent, {
      width: '500px',
      data: {
        mode: 'edit',
        module: 'Page Order',
        form: {
          fields: [
            {
              label: 'List of Page Order',
              key: 'selectedPageOrder',
              type: 'select',
              selectOptions: pageList,  // Pass the pageList to the select field
              required: false
            },
            {
              label: `Current page order: ${currentPage.pageOrder}`,
              key: 'newOrder',
              type: 'number',
              required: true,
              value: currentPage.pageOrder,  // Set the current page order as the initial value
              placeholder: `Current: ${currentPage.pageOrder}` // Show the current page order as a placeholder
            }
          ]
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newOrder = result.newOrder;

        if (newOrder !== currentPage.pageOrder) {
          // Update current page order
          currentPage.pageOrder = newOrder;

          this.service.updatePageOrder(currentPage.id, newOrder).subscribe(data => {
            this.loadPages(); // Reload pages to reflect changes
            this.showSnackBar("Page order has been changed")
          },
            (error) => {
              console.error('Error updating page order:', error);
              this.showSnackBar("An error occurred while updating the page order.")
            }
          )
          // Update the order in the backend
          // this.http.put(this.api + "updatePageOrder/" + currentPage.id, { pageOrder: newOrder }).subscribe(
          //   () => {
          //     this.loadPages(); // Reload pages to reflect changes
          //     this.showSnackBar("Page order has been changed")
          //   },
          //   (error) => {
          //     console.error('Error updating page order:', error);
          //     this.showSnackBar("An error occurred while updating the page order.")
          //   }
          // );
        }
      }
    });
  }


  private savePage() {
    const pageHtml = this.editor.getHtml();
    const pageCss = this.editor.getCss();
    const currentPage = this.pages[this.currentPageIndex];
    console.log(currentPage);

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

        this.service.updatePage(currentPage.id, updatedPage).subscribe(data => {

          this.showSnackBar("Page saved successfully");
        },
          (error) => {
            this.showSnackBar('Error saving page:');

          })

        // this.http.put(this.api + "updatePage/" + currentPage.id, updatedPage).subscribe(
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



  private addPage() {
    const dialogRef = this.dialog.open(CRUDmodalComponent, {
      width: '400px',
      data: {
        mode: 'create',
        module: 'Page',
        form: {
          fields: [
            { label: 'Page Name', key: 'name', type: 'text', required: true },
            { label: 'Display Page', key: 'isDisplay', type: 'select', selectOptions: [{ label: 'Yes', value: true }, { label: 'No', value: false }] }
          ]
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newPage = {
          name: result.name,
          component: '',
          styles: '',
          isDisplay: result.isDisplay.value
        };

        this.service.createPage(newPage).subscribe(data => {
          this.pages.push(data);
          this.currentPageIndex = this.pages.length - 1;
          this.loadPage(this.currentPageIndex);
          this.loadPages();
          this.showSnackBar("Page Added Successfully");
        },
          (error) => {
            console.error('Error adding page:', error);
          })

        // this.http.post(this.api + "createPages", newPage).subscribe(
        //   (response: any) => {
        //     this.pages.push(response);
        //     this.currentPageIndex = this.pages.length - 1;
        //     this.loadPage(this.currentPageIndex);
        //     this.loadPages();
        //     this.showSnackBar("Page Added Successfully");
        //   },
        //   (error) => {
        //     console.error('Error adding page:', error);
        //   }
        // );
      }
    });
  }

  private updatePageStatus() {
    const currentPage = this.pages[this.currentPageIndex];
    const currentStatus = currentPage.isDisplay ? 'Visible' : 'Hidden';

    // Open the modal dialog for updating page status
    const dialogRef = this.dialog.open(CRUDmodalComponent, {
      width: '400px',
      data: {
        mode: 'edit',
        module: 'Page Status',
        form: {
          fields: [
            {
              label: `Current status: ${currentStatus}.`,
              key: 'newStatus',
              type: 'select',
              selectOptions: [
                { label: 'Visible', value: true },
                { label: 'Hidden', value: false }
              ],
              required: true,
              value: currentPage.isDisplay // Set the current status as the initial value
            }
          ]
        }
      }
    });

    // After modal dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newStatus = result.newStatus.value;

        // Check if the new status is different from the current status
        if (newStatus !== currentPage.isDisplay) {
          currentPage.isDisplay = newStatus;


          this.service.updateStatus(currentPage.id, newStatus).subscribe(data => {
            this.showSnackBar("Page display status updated successfully!");
            this.loadPages(); // Reload pages to reflect changes
          },
            (error) => {
              console.error('Error updating page status:', error);
              this.showSnackBar("An error occurred while updating the page status.");
            })

          // Update the status in the backend
          // this.http.put(this.api + "updateStatus/" + currentPage.id, { isDisplay: newStatus }).subscribe(
          //   () => {
          //     this.showSnackBar("Page display status updated successfully!");
          //     this.loadPages(); // Reload pages to reflect changes
          //   },
          //   (error) => {
          //     console.error('Error updating page status:', error);
          //     this.showSnackBar("An error occurred while updating the page status.");
          //   }
          // );
        } else {
          this.showSnackBar("No change in status.");
        }
      }
    });
  }


  private deletePage() {
    if (this.pages.length <= 1) {
      this.showSnackBar("Cannot delete the last page.");
      return;
    }

    const dialogRef = this.dialog.open(CRUDmodalComponent, {
      width: '400px',
      data: {
        mode: '',
        module: 'Are you sure to delete this page?',
        form: {
          fields: [

          ]
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deletePage(this.pages[this.currentPageIndex].id).subscribe(data => {
          this.pages.splice(this.currentPageIndex, 1);
          this.currentPageIndex = Math.max(0, this.currentPageIndex - 1);
          this.loadPage(this.currentPageIndex);
          this.showSnackBar("Page Deleted");

        },
          (error) => {
            this.showSnackBar("Error occured");
          })
        // this.http.delete(`${this.api + "deletePage"}/${this.pages[this.currentPageIndex].id}`).subscribe(
        //   () => {
        //     this.pages.splice(this.currentPageIndex, 1);
        //     this.currentPageIndex = Math.max(0, this.currentPageIndex - 1);
        //     this.loadPage(this.currentPageIndex);
        //     this.showSnackBar("Page Deleted");
        //   },
        //   (error) => {
        //     this.showSnackBar("Error occured");
        //   }
        // );
      }
    });
  }

  private switchPagePrompt() {
    // Create a list of pages displaying their names and pageOrder
    const pageList = this.pages.map(page => ({
      label: `${page.pageOrder}: ${page.name}`,
      value: page.pageOrder
    }));

    const dialogRef = this.dialog.open(CRUDmodalComponent, {
      width: '400px',
      data: {
        mode: 'select',
        module: 'Page',
        form: {
          fields: [
            {
              label: 'Select a page by its order',
              key: 'selectedPageOrder',
              type: 'select',
              selectOptions: pageList,
              required: true
            }
          ]
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const selectedPageOrder = result.selectedPageOrder;

        // Find the page index by its pageOrder
        const selectedPageIndex = this.pages.findIndex(page => page.pageOrder === selectedPageOrder.value);

        if (selectedPageIndex !== -1) {
          this.switchPage(selectedPageIndex);
          this.showSnackBar("Page Switched");
        } else {

        }
      }
    });
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


  showSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
