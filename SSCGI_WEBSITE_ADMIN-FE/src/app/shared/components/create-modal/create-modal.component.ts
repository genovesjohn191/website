import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.css'
})
export class CreateModalComponent {

}
