import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  dataLoaded = false;
  currentBrand: Brand;
 
  brandText="";
  constructor(private brandService: BrandService,private authService:AuthService) { }

  ngOnInit(): void {
    this.getBrands();
    this.isAuthenticated();
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
    
  }
  
  getCurrentBrandClass(brand:Brand){
    
    if(brand==this.currentBrand){
      return "list-group-item list-group-item-action active"
      
    } 
    
    else{
      return "list-group-item"
    }
}

isAuthenticated(){
  if(this.authService.isAuthenticated()){
    return true
    
  }
  else{
    return false
  }
 }
}