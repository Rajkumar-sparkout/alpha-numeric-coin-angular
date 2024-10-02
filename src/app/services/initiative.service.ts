import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Initiative } from '../interfaces/common';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {

  private apiUrl = environment.API_BASE_URL + '/api/v1/admin/';
  
  constructor(private http:HttpClient) { }

  getInitiatives(data:any, limit?: number, page?: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}list-initiatives?page=${page}&limit=${limit}&search=${data}`); 
  }

  createInitiative(initiative: Initiative): Observable<any>{
    return this.http.post<Initiative>(`${this.apiUrl}create-initiative` , initiative);
  }

  deleteInitiativeById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}delete-initiative/${id}`);
  }
}
