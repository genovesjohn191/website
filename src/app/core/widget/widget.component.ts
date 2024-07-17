import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'sscgi-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent {
  isOpen = false;

  toggleWidget() {
    this.isOpen = !this.isOpen;
  }
}
