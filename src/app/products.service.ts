import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _HttpClient:HttpClient) { }
  getProducts():Observable<any>{
    return this._HttpClient.get(environment.baseURL+'api/v1/products')
  }
  getProductDetails(id:string):Observable<any>{
    return this._HttpClient.get(environment.baseURL+`api/v1/products/${id}`)
  }
  getProductCategories():Observable<any>{
    return this._HttpClient.get(environment.baseURL+`api/v1/categories`)
  }
}
