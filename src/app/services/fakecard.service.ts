import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeCard } from '../models/fakeCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponceModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FakecardService {

  apiUrl = 'https://localhost:44377/api/';

  constructor( private httpClient:HttpClient) { }

  add(creditCard:FakeCard):Observable<ResponceModel>{
    let newPath=this.apiUrl+"fakecards/add"
    return this.httpClient.post<ResponceModel>(newPath,creditCard)
   }

   getCreditCardByUserId(userId:number):Observable<ListResponseModel<FakeCard>>{
    let newPath=this.apiUrl+"fakecards/getallbyuserid?userId="+userId
    return this.httpClient.get<ListResponseModel<FakeCard>>(newPath);

  }
  
}
