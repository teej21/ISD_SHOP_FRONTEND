import { ICategories } from "./ICategory";

export interface Product {
    name: string,
    description: string,
    price: number,
    thumbnailImage: File | null,
    categoryId: number,
    material: string,
    width: Number,
    status: string,
    height: Number,
    publishYear: Number,
  }

  // export interface Product2{
  //   name: string,
  //   description: string,
  //   price: number,
  //   thumbnailImage: File | null,
  //   categoryId: number | null,
  //   material: string,
  //   width: Number,
  //   status: string,
  //   height: Number,
  //   publishYear: Number,
  // }
  export enum Status{
    AVAILABLE ="AVAILABLE", STOCKOUT = "STOCKOUT", ORDERED ="ORDERED"
  }

