import { Component, OnInit } from '@angular/core';
import { FirestoreService, Tile } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tile-list',
  templateUrl: './tile-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TileListComponent implements OnInit {
  tiles: Tile[] = [];
  selectedTile: Tile | null = null;
  selectedBoxes: number = 1;

  readonly BOX_SIZE_M2 = 5;

  constructor(
    private firestoreService: FirestoreService,
    private cartService: CartService
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

    const totalArea = this.selectedBoxes * this.BOX_SIZE_M2;

    this.cartService.addTileQuantity(tile, quantity);

    alert(
      `✅ ${this.selectedBoxes} doboz (${totalArea} m²) hozzáadva a kosárhoz!`
    );
    this.closeModal();
  }
}
