import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  color: Color
  colorUpdateForm: FormGroup
  colorId:number;
  colorName:string;

  constructor(private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if (params['colorId']) {
        this.getColor(params['colorId']);
        this.createColorForm();
      }
    });
  }

  getColor(id:number){
  
    this.colorService.getById(id).subscribe((response) => {
      this.color = response.data;
      this.colorId= this.color.colorId
      this.colorName = this.color.colorName
    
     
      
    });
    
  }
  createColorForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId:[ Validators.required],
      colorName:[ Validators.required]
    })
  }

  update() {
    if (this.colorUpdateForm.valid) {
      this.colorUpdateForm.addControl("colorId", new FormControl(this.color.colorId))
      let brandModel = Object.assign({}, this.colorUpdateForm.value)
      this.colorService.update(brandModel).subscribe(response => {
        this.toastrService.success( "Success")
        this.router.navigate(["/colors/list"])
      }, responseError => {
        if (responseError.error.Errors.length > 0)
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Validation Exception")
          }
      })
    }
    else {
      this.toastrService.error("Your form is not full", "Atention")
    }
  }

}
