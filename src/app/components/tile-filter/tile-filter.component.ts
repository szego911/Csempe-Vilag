import { Component, Output, EventEmitter } from '@angular/core';
import { FirestoreService, Tile } from '../../services/firestore.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tile-filter',
  standalone: true,
  templateUrl: './tile-filter.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class TileFilterComponent {
  @Output() tilesFiltered = new EventEmitter<Tile[]>();

  searchName = '';
  selectedColor = '';
  selectedSurface = '';

  constructor(private firestoreService: FirestoreService) {}

  filterByName() {
    if (!this.searchName) return;
    this.firestoreService
      .searchTilesByName(this.searchName)
      .subscribe((data) => this.tilesFiltered.emit(data));
  }

  filterByColor() {
    if (!this.selectedColor) return;
    this.firestoreService
      .getGreyTilesSortedByPrice() // vagy: getTilesByColor(this.selectedColor)
      .subscribe((data) => this.tilesFiltered.emit(data));
  }

  filterBySurface() {
    if (!this.selectedSurface) return;
    this.firestoreService
      .getWideMattTilesByWeightDesc() // vagy: getTilesBySurface(this.selectedSurface)
      .subscribe((data) => this.tilesFiltered.emit(data));
  }

  resetFilters() {
    this.searchName = '';
    this.selectedColor = '';
    this.selectedSurface = '';
    this.firestoreService
      .getTiles()
      .subscribe((data) => this.tilesFiltered.emit(data));
  }
}
