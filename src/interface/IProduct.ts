import { ICategories } from "./ICategory";

export interface Product {
    id: string,
    name: string,
    description: string,
    price: number,
    thumbnail: File | null,
    category: ICategories,
    material: string,
    width: Number,
    status: string,
    height: Number,
    publishYear: Number,
  }

  export enum Status{
    AVAILABLE, STOCKOUT, ORDERED
  }

