import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  private baseURL = "http://localhost:8085";
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private _http: HttpClient) { }

  getCount(): Observable<any> {
    return this._http.post(this.baseURL+"/getCount", null);
  }
}

