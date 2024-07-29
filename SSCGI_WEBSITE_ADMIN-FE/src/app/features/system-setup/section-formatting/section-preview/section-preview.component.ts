import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-section-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-preview.component.html',
  styleUrl: './section-preview.component.css'
})
export class SectionPreviewComponent {
  @Input() backgroundStyle: string | undefined;
  @Input() sectionStyle: string | undefined;
  @Input() elements: Array<{ 
    type: string, 
    text?: string, 
    style?: string, 
    isParent?: boolean, 
    children?: Array<any>,
    buttonType?: string,
  }> = [];

  style = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['backgroundStyle']) {
      this.updateStyle();
    }
    // console.log(this.backgroundStyle)
  }

  updateStyle(): void {
    if (this.backgroundStyle?.startsWith('url')) {
      this.style = { 
        'background-image': this.backgroundStyle, 
      };
    } else {
      this.style = { 'background-color': this.backgroundStyle || '' };
    }
  }

  getTextStyle(element: any): { [key: string]: string } {
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
