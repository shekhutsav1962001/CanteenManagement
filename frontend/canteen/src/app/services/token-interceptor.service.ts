import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private injector:Injector) { }


  intercept(req,next)
  {
    let authService = this.injector.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization:`Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
