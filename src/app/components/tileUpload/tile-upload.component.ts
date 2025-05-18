import { Component } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tile-upload',
  templateUrl: './tile-upload.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class TileUploadComponent {
  tileForm: FormGroup;
  selectedFile: File | null = null;
  uploading = false;
  uploadSuccess = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService
  ) {
    this.tileForm = this.fb.group({
      name: ['', Validators.required],
      pricePerSqm: [0, Validators.required],
      colorShade: [''],
      surface: [''],
      material: [''],
      recommendedUse: [''],
      width_cm: [0],
      depth_cm: [0],
      thickness_cm: [0],
      weight_kg: [0],
      stock: [0],
      location: [''],
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      this.selectedFile = target.files[0];
    }
  }

  async onSubmit() {
    if (!this.tileForm.valid || !this.selectedFile) {
      this.errorMsg = 'Kérlek töltsd ki az űrlapot és válassz képet.';
      return;
    }

    this.uploading = true;
    this.errorMsg = '';
    try {
      await this.firestoreService.uploadTileWithImage(
        this.tileForm.value,
        this.selectedFile
      );
      this.uploadSuccess = true;
      this.tileForm.reset();
      this.selectedFile = null;
    } catch (error) {
      this.errorMsg = 'Hiba történt a feltöltés során.';
      console.error(error);
    } finally {
      this.uploading = false;
    }
  }
}
