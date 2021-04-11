import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,FormControl,Validators} from"@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup;
  brandDeleteForm: FormGroup;
  selectedBrand: Brand;
  
  constructor(private brandService: BrandService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
       brandName: ['', Validators.required],
       model:['',Validators.required]
    });
 }

 deleteCreateForm() {
  this.brandDeleteForm = this.formBuilder.group({
    brandId: [this.selectedBrand.brandId, [Validators.required]],
    brandName: [this.selectedBrand.brandName, [Validators.required]],
  });
}

 add() {
    let brand = Object.assign({}, this.brandAddForm.value);

    if (!this.brandAddForm.valid) {
       this.toastrService.warning('Lütfen bilgileri doldurun', 'Dikkat');
       return;
    }

    this.brandService.add(brand).subscribe(responseSuccess => {
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
