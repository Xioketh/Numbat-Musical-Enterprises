import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = "http://localhost:8085";
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private _http: HttpClient) { }

  saveproduct(payload: any): Observable<any> {
    return this._http.post(this.baseURL+"/addProduct", payload);
  }

  deleteProduct(payload: any): Observable<any> {
    return this._http.post(this.baseURL+"/deleteProduct", payload);
  }

  getAllProducts(): Observable<any> {
    return this._http.post(this.baseURL+"/getAllProducts",null,{headers: this.requestHeader,});
  }

  getLatestProducts(): Observable<any> {
    return this._http.post(this.baseURL+"/getLatestProducts",null);
  }

  getActiveProducts(): Observable<any> {
    return this._http.post(this.baseURL+"/getActiveProducts",null,{headers: this.requestHeader,});
  }

  updateProduct(paylord):Observable<any>{
    return this._http.post<any>(this.baseURL +'/updateProduct', paylord);
  }

  public upload(payload): Observable<any> {
    const formData: FormData = new FormData();
    // formData.append('pId', payload.pId);
    formData.append('image1', payload.image1);
    formData.append('image2', payload.image2);
    formData.append('image3', payload.image3);
    return this._http.post<any>(this.baseURL +'/uploadImages', formData);
  }

}

