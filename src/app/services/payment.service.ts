import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { ResponceModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = 'https://localhost:44377/api/';
  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment) : Observable<ResponceModel>{
    let newPath = this.apiUrl + "payments/add"
    return this.httpClient.post<ResponceModel>(newPath, payment);
  }

  addToCart(rental:Rental){
    let cartItem = new CartItem();
    cartItem.rental = rental;
    CartItems.push(cartItem);
  }

  listCart(): CartItem[]{
    return CartItems;
  }
}
