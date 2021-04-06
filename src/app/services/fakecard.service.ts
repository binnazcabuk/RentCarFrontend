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

  isCardExist(fakeCard:FakeCard):Observable<ResponceModel>{
    let newPath = this.apiUrl + "fakecards/iscardexist";
    console.log(fakeCard);
    return this.httpClient.post<ResponceModel>(newPath,fakeCard);
  }

  getCardByNumber(cardNumber:string):Observable<ListResponseModel<FakeCard>>{
    let newPath = this.apiUrl + "fakecards/getbycardnumber?cardnumber=" + cardNumber;
    return this.httpClient.get<ListResponseModel<FakeCard>>(newPath);
  }

  updateCard(fakeCard:FakeCard){
    let newPath = this.apiUrl + "fakecards/update";
    this.httpClient.put(newPath,fakeCard)
  }

  getCreditCardByUserId(userId:number):Observable<ListResponseModel<FakeCard>>{
    let newPath=this.apiUrl+"creditCards/getallbyuserid?userId="+userId
    return this.httpClient.get<ListResponseModel<FakeCard>>(newPath);

  }
  
}
