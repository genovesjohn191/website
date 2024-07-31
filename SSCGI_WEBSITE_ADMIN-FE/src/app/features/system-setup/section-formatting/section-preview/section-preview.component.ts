import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-section-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-preview.component.html',
  styleUrls: ['./section-preview.component.css'] // styleUrl should be styleUrls
})
export class SectionPreviewComponent {
  @Input() sectionData: any;
  
  backgroundStyle: string = '';
  sectionLayout: string = '';
  @Input() elements: Array<{ 
    id: number;
    style?: string;
    isParent?: boolean;
    children?: any[];
    buttonType?: string;
    elementType: string;
    parentId?: number | null;
    divLayout?: string;
    divBackground?: string;
    fontStyle?: string;
    fontColor?: string;
    fontWeight?: string;
    fontFamily?: string;
    fontSize?: string;
    textAlignment?: string;
    elementText?: string
  }> = [];


  style: { [key: string]: string } = {}; // Initialize style as an object

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sectionData']) {
      this.elements = this.sectionData?.elements || []; // Use optional chaining and fallback
      if (this.sectionData?.backgroundImage) {
        this.backgroundStyle = `url(${this.sectionData.backgroundImage})`;
      } else {
        this.backgroundStyle = this.sectionData?.backgroundColor || '';
      }
      this.sectionLayout = this.sectionData?.sectionLayout || '';
      this.updateStyle()
      console.log(this.sectionData)
    }
  }

  updateStyle(): void {
    // Initialize the base style with section-specific styles
    this.style = {
      'padding': this.sectionData.padding || '0px',
      'height': this.sectionData.height || 'auto',
      'gap': this.sectionData.gap || '0px',
    };
  
    // Add background-related styles based on backgroundStyle
    if (this.backgroundStyle?.startsWith('url')) {
      this.style['background-image'] = this.backgroundStyle;
    } else {
      this.style['background-color'] = this.backgroundStyle || '';
    }
  }
  

  getTextStyle(element: any) {
    return {
      'font-style': element.fontStyle || 'normal',
      'color': element.fontColor || '#000000',
      'font-weight': element.fontWeight || 'normal',
      'font-family': element.fontFamily || 'Arial',
      'font-size': element.fontSize || '16px',
      'text-align': element.textAlignment || 'left'
    };
  }

}
