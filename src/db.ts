import Dexie from 'dexie';
import type { Table } from 'dexie';

interface FridgeItem {
  id?: number;
  name: string;
  quantity: number;
  category: 'Frutas' | 'Legumes' | 'Laticínios' | 'Carnes' | 'Peixes' | 'Bebidas' | 'Outros';
  expiryDate?: string;
  notes?: string;
  addedDate: string;
  image?: string;
}

export class FridgeDatabase extends Dexie {
  items!: Table<FridgeItem>;

  constructor() {
    super('FridgeDatabase');
    this.version(1).stores({
      items: '++id, name, quantity, category, expiryDate, notes, addedDate, image'
    });
  }
}

export const db = new FridgeDatabase();

export type { FridgeItem };