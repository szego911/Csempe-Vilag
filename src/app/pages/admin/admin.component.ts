import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TileUploadComponent } from '../../components/tileUpload/tile-upload.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-page',
  templateUrl: './admin.component.html',
  imports: [CommonModule, TileUploadComponent, ReactiveFormsModule],
})
export class AdminComponent {}

