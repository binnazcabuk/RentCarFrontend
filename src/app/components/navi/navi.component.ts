import { Component, OnInit,ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  kontrol: any;

  constructor(public authService:AuthService,
    private toastrService:ToastrService,
    private localStorageService: LocalStorageService,
      private router: Router,
     
     ) { }

     user: User;
     filterText="";
     

  ngOnInit(): void {

    if(this.isAuthenticated()){
      this.authService.userDetailFromToken();  
    } 
  var myModal = document.getElementById('myModal')
  var myInput = document.getElementById('myInput')

 myModal.addEventListener('shown.bs.modal', function () {
 myInput.focus()
})
   
  
}



isAuthenticated(){
  if(this.authService.isAuthenticated()){
    return true
  }
  else{
    return false
  }
 }

logout() {
  this.localStorageService.removeToken();
  
  return this.router.navigate(["/login"]);
}



}
