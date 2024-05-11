import { ICategories } from "./ICategory";

export interface Product {
    name: string,
    description: string,
    price: number,
    thumbnailImage: File | null,
    categoryId: number,
    material: string,
    width: Number,
    height: Number,
    publishYear: Number,
    status: string,
  }

  export interface ProductGet {
    id: string,
    name: string,
    description: string,
    price: number,
    thumbnail: string | null,
    categoryId: number,
    material: string,
    width: Number,
    height: Number,
    publishYear: Number,
    status: string
  }

  export enum Status{
    AVAILABLE ="AVAILABLE", STOCKOUT = "STOCKOUT", ORDERED ="ORDERED"
  }

  export interface ProductShortInfo {
    id: string,
    name: string,
    thumbnail: string | undefined,
    thumbnailImage: string | null
  }

