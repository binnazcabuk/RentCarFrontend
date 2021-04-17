import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,FormControl,Validators} from"@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImages';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

carImageAddForm:FormGroup;
  carAddForm: FormGroup;
  brands: Brand[] = [];
  colors: Color[] = [];
  
  constructor( private formBuilder: FormBuilder,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private carService: CarService) { }

  ngOnInit(): void {
    this.createCarAddForm();
   
    this.getBrands();
    this.getColors();
  }
  
  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
       brandId: ['', Validators.required],
       colorId: ['', Validators.required],
       modelYear: ['', Validators.required],
       dailyPrice: ['', Validators.required],
       description: ['', Validators.required],
       minFindexScore:['', Validators.required],
    });
 }


 getBrands() {
    this.brandService.getBrands().subscribe(responseSuccess => {
       this.brands = responseSuccess.data;
    }, responseError => {
       this.toastrService.error(responseError.message, responseError.name);
    });
 }

 getColors() {
    this.colorService.getColors().subscribe(responseSuccess => {
       this.colors = responseSuccess.data;
    }, responseError => {
       this.toastrService.error(responseError.message, responseError.name);
    });
 }
 
 add() {
  let car: Car = Object.assign({}, this.carAddForm.value);

  car.brandId = Number(car.brandId);
  car.colorId = Number(car.colorId);
  car.modelYear = String(car.modelYear);
  car.dailyPrice = Number(car.dailyPrice);
  car.minFindexScore=Number(car.minFindexScore);

  if (!this.carAddForm.valid) {
     this.toastrService.warning('Lütfen boş bilgi bırakmayın', 'Dikkat');
     return;
  }

  this.carService.add(car).subscribe(responseSuccess => {
     return this.toastrService.success(responseSuccess.message, 'Başarılı');
  }, responseError => {
     if (responseError.error.ValidationErrors.length == 0) {
        this.toastrService.error(responseError.error.Message, responseError.error.StatusCode);
        return;
     }

     for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
        this.toastrService.error(
           responseError.error.ValidationErrors[i].ErrorMessage, 'Doğrulama Hatası'
        );
     }
  });
}

}
