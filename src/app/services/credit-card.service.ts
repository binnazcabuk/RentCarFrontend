import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponceModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = 'https://localhost:44377/api/';
  constructor(private httpClient:HttpClient) { }

  add(creditCard:CreditCard):Observable<ResponceModel>{
    let newPath=this.apiUrl+"creditCards/add"
    return this.httpClient.post<ResponceModel>(newPath,creditCard)
   }
   
   getCreditCardByUserId(userId:number):Observable<ListResponseModel<CreditCard>>{
    let newPath=this.apiUrl+"creditCards/getallbyuserid?userId="+userId
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);

  }
}
