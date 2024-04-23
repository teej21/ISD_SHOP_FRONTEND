import { ICategories } from "./ICategory";

export interface Product {
    id: string,
    name: string,
    description: string,
    price: number,
    thumbnailImage: File | null,
    category: ICategories,
    material: string,
    width: Number,
    status: string,
    height: Number,
    publishYear: Number,
  }

  export enum Status{
    AVAILABLE ="AVAILABLE", STOCKOUT = "STOCKOUT", ORDERED ="ORDERED"
  }

