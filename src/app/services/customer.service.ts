import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = 'https://localhost:44377/api/';
  constructor( private httpClient: HttpClient) { }

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl +'customers/getcustomerdetails';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  

  getCustomerById(customerId: number): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/getcustomerdetailbyid?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getCustomersByUserId(userId:number):Observable<SingleResponseModel<Customer>>{
    let newPath=this.apiUrl+"customers/getbyuserid?id="+userId
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }
 
}
