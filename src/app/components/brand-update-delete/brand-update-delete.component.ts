import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,FormControl,Validators} from"@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Console } from 'node:console';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update-delete',
  templateUrl: './brand-update-delete.component.html',
  styleUrls: ['./brand-update-delete.component.css']
})
export class BrandUpdateDeleteComponent implements OnInit {

  brands: Brand;
 
  brandUpdateForm: FormGroup;
  brandId:number;
  brandName:string;
  model:string;
  

  constructor( private brandService: BrandService,
   private activatedRoute: ActivatedRoute,
   private formBuilder: FormBuilder,
   private toastrService: ToastrService,
   private router: Router) { }

  ngOnInit(): void {

  

   this.activatedRoute.params.subscribe((params) => {
     if (params['brandId']) {
       this.getBrandById(params['brandId']);
       this.createBrandUpdateForm();
     }
   });
  }

  getBrandById(brandId: number) {
   this.brandService.getById(brandId).subscribe((response) => {
     this.brands = response.data;
     this.brandId= this.brands.brandId
     this.brandName = this.brands.brandName
     this.model=this.brands.model
    
     
   });
 }

  createBrandUpdateForm() {
   this.brandUpdateForm = this.formBuilder.group({
     brandId: [ Validators.required],
     brandName: [ Validators.required],
     model:[ Validators.required]
   });
 }



 update() {
   if (this.brandUpdateForm.valid) {
     let brandModel = Object.assign({}, this.brandUpdateForm.value);
     this.brandService.update(brandModel).subscribe((response) => {
       this.toastrService.success(response.message, 'Başarılı');
     });
   }
 }
}