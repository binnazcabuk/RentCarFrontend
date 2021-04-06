import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Findex } from '../models/findex';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponceModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {
  apiUrl = 'https://localhost:44377/api/findeks/';
  constructor(private httpClient: HttpClient) { }

  getFindexScoreByUserId(userId:number):Observable<ListResponseModel<Findex>>{
    let newPath=this.apiUrl+"findexs/getallbyuserid?userId="+userId
    return this.httpClient.get<ListResponseModel<Findex>>(newPath);

  }
}
