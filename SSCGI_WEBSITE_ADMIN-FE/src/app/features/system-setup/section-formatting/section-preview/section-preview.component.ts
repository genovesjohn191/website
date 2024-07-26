import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-preview',
  standalone: true,
  imports: [],
  templateUrl: './section-preview.component.html',
  styleUrl: './section-preview.component.css'
})
export class SectionPreviewComponent {
  @Input() backgroundStyle: string | undefined;
}
