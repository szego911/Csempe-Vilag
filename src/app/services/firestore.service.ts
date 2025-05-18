import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  CollectionReference,
} from '@angular/fire/firestore';
import { collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage'; // FireStorage beemelése

export interface Tile {
  id?: string;
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

  /**
   * 🔼 Kép feltöltése Firebase Storage-be és URL mentése Firestore-ba
   */
  async uploadTileWithImage(tile: Omit<Tile, 'imageUrl'>, imageFile: File): Promise<void> {
    const storage = getStorage();
    const imageRef = ref(storage, `csempe-kepek/${imageFile.name}`);

    // Kép feltöltése
    await uploadBytes(imageRef, imageFile);

    // URL lekérése
    const downloadURL = await getDownloadURL(imageRef);

    // Teljes tile objektum imageURL-lel
    const fullTile: Tile = {
      ...tile,
      imageUrl: downloadURL,
    };

    // Mentés Firestore-ba
    await this.addTile(fullTile);
  }
}
