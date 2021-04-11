import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { AuthService } from 'src/app/services/auth.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  dataLoaded = false;
  colors: Color[] = [];
  currentColor: Color;
colorText="";

  constructor(private colorService: ColorService,private authService:AuthService) { }

  ngOnInit(): void {
    this.getColors();
    this.isAuthenticated();
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }
  setCurrentColor(color:Color){
    this.currentColor=color;
  }

  getCurrentColorClass(color:Color){
    if(color==this.currentColor){
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