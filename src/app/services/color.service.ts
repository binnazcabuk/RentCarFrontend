import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponceModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = 'https://localhost:44377/api/colors/getall';
  apiUrl2 = 'https://localhost:44377/api/';
  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl);
  }

  add(color:Color):Observable<ResponceModel>{
    let newPath = this.apiUrl2 + "colors/add";
    return this.httpClient.post<ResponceModel>(newPath,color);
  }
  update(color: Color): Observable<ResponceModel> {
    let newPath = this.apiUrl2 + "colors/update"
    return this.httpClient.post<ResponceModel>(newPath, color)
  }

  getById(id: number): Observable<SingleResponseModel<Color>> {
    let newPath = this.apiUrl2 + "colors/getbyid?id=" + id
    return this.httpClient.get<SingleResponseModel<Color>>(newPath)
  }
}
