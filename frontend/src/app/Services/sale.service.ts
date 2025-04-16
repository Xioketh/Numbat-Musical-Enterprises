import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private baseURL = "http://localhost:8085";
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private _http: HttpClient) { }

  addSale(payload: any): Observable<any> {
    return this._http.post(this.baseURL + "/addSale", payload);
  }

  sendMail(payload: any): Observable<any> {
    return this._http.post(this.baseURL + "/sendmail", payload);
  }

  getAllSales(): Observable<any> {
    return this._http.post(this.baseURL + "/getAllSales", null);
  }

  getReportData(startDate: string, endDate: string): Observable<any> {
    const fm = new FormData();
    fm.append('startDate', startDate);
    fm.append('endDate', endDate);
    return this._http.post(this.baseURL + "/getReportData", fm);
  }

  getCustomerSale(paylord: any): Observable<any> {
    return this._http.post(this.baseURL + "/getCustomerSales", paylord);
  }

  getSelectedSale(paylord: any): Observable<any> {
    return this._http.post(this.baseURL + "/getSelectedSale", paylord);
  }

}
