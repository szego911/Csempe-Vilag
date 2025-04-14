import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  CollectionReference,
} from '@angular/fire/firestore';
import { collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Tile {
  id: string;
  name: string;
  pricePerSqm: number;
  colorShade: string;
  surface: string;
  material: string;
  recommendedUse: string;
  width_cm: number;
  depth_cm: number;
  thickness_cm: number;
  weight_kg: number;
  imageUrl: string;
  stock: number;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private tilesCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.tilesCollection = collection(this.firestore, 'csempek');
  }

  addTile(tile: Tile) {
    return addDoc(this.tilesCollection, tile);
  }

  bulkAddTiles(tiles: Tile[]) {
    const promises = tiles.map((tile) => this.addTile(tile));
    return Promise.all(promises);
  }

  getTiles(): Observable<Tile[]> {
    return collectionData(this.tilesCollection, {
      idField: 'docId',
    }) as Observable<Tile[]>;
  }
}
