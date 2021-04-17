import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RentCarFrontend';


  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    
    this.isAuthenticated();
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
