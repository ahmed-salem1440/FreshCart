import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddheadersInterceptor implements HttpInterceptor {
  
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  let userToken:any = localStorage.getItem('userToken')
    let modifiedRequest = request.clone({
      headers:request.headers.set("token",userToken)
    })
    return next.handle(modifiedRequest);
  }
}
