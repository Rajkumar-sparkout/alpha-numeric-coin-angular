import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Web3 from 'web3';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Initiative } from '../interfaces/common';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private apiUrl = environment.API_BASE_URL + '/api/v1/admin/';

  constructor(private http:HttpClient){}
  
  sendAccountAddress(walletAddress: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, { wallet_address: walletAddress }); 
  }

  logout(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}logout`); 
  }

}
