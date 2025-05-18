import { Component, OnInit } from '@angular/core';
import { FirestoreService, Tile } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tile-list',
  templateUrl: './tile-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
})
export class TileListComponent implements OnInit {
  tiles: Tile[] = [];
  selectedTile: Tile | null = null;
  selectedBoxes: number = 1;

  readonly BOX_SIZE_M2 = 5;

  constructor(
    private firestoreService: FirestoreService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.firestoreService.getTiles().subscribe((data) => {
      this.tiles = data;
    });
  }

  openModal(tile: Tile) {
    this.selectedTile = tile;
    this.selectedBoxes = 1;
  }

  closeModal() {
    this.selectedTile = null;
  }

  addBoxesToCart() {
    if (!this.selectedTile) return;

    const tile = this.selectedTile;
    const quantity = this.selectedBoxes;
    const totalArea = quantity * this.BOX_SIZE_M2;

    this.cartService.addTileQuantity(tile, quantity);

    this.snackBar.open(
      `✅ ${quantity} doboz (${totalArea} m²) hozzáadva a kosárhoz!`,
      'OK',
      {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['snackbar-success'],
      }
    );

    this.closeModal();
  }
}
