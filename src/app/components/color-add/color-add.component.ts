import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,FormControl,Validators} from"@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {


 colorAddForm:FormGroup;
 selectedColor: Color;
  constructor(private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
       colorName: ['', Validators.required],
      
    });
 }

 add() {
  let color = Object.assign({}, this.colorAddForm.value);

  if (!this.colorAddForm.valid) {
     this.toastrService.warning('Lütfen bilgileri doldurun', 'Dikkat');
     return;
  }

  this.colorService.add(color).subscribe(responseSuccess => {
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
