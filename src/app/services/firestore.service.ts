import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  CollectionReference,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
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
  async uploadTileWithImage(
    tile: Omit<Tile, 'imageUrl'>,
    imageFile: File
  ): Promise<void> {
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

  /**
   * 1. Szürke csempék ár szerint növekvő sorrendben
   */
  getGreyTilesSortedByPrice(): Observable<Tile[]> {
    const q = query(
      this.tilesCollection,
      where('colorShade', '==', 'Szürke'),
      orderBy('pricePerSqm', 'asc')
    );
    return collectionData(q, { idField: 'docId' }) as Observable<Tile[]>;
  }

  /**
   * 2. Beltéri, készleten lévő csempék (limit 10)
   */
  getIndoorAvailableTilesLimited(): Observable<Tile[]> {
    const q = query(
      this.tilesCollection,
      where('recommendedUse', '==', 'Beltér'),
      where('stock', '>', 0),
      limit(10)
    );
    return collectionData(q, { idField: 'docId' }) as Observable<Tile[]>;
  }

  /**
   * 3. Lapozás ár szerint (ár alapján léptetés)
   */
  getTilesAfterPrice(
    lastPrice: number,
    pageSize: number = 5
  ): Observable<Tile[]> {
    const q = query(
      this.tilesCollection,
      orderBy('pricePerSqm', 'asc'),
      startAfter(lastPrice),
      limit(pageSize)
    );
    return collectionData(q, { idField: 'docId' }) as Observable<Tile[]>;
  }

  /**
   * 4. Matt felületű, szélesebb mint 30 cm, súly szerint csökkenő
   */
  getWideMattTilesByWeightDesc(): Observable<Tile[]> {
    const q = query(
      this.tilesCollection,
      where('surface', '==', 'Matt'),
      where('width_cm', '>', 30),
      orderBy('weight_kg', 'desc')
    );
    return collectionData(q, { idField: 'docId' }) as Observable<Tile[]>;
  }

  searchTilesByName(name: string): Observable<Tile[]> {
    const q = query(
      this.tilesCollection,
      orderBy('name'),
      startAfter(name),
      limit(10)
    );
    return collectionData(q, { idField: 'docId' }) as Observable<Tile[]>;
  }
}
