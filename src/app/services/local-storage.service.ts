import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { TokenModel } from '../models/tokenModel';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  currentCustomer:string="";
  tokenKey = "token"
  constructor() { }

 
  getItem(key:string){return localStorage.getItem(key);}
 

  clean() {
    localStorage.clear();
  }

  saveToken(value: string) {
    localStorage.removeItem('token');
    localStorage.setItem('token', value);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
