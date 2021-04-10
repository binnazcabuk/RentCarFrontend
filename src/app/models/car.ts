import { Byte } from "@angular/compiler/src/util";

export interface Car {
    carId: number;
    brandName: string;
    colorName: string;
    brandId:number;
    colorId:number;
    dailyPrice: number;
    description: string;
    modelYear: string;
    imagePath?:string;
    model:string;
    minFindexScore:number;
    
  }
  