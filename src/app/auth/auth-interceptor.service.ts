import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { AuthService } from "./auth.service";
import { exhaustMap, map, take, tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user?.token) {
          return next.handle(req);
        }

        const modifeiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        })

        return next.handle(modifeiedReq);
      }));
  }
}
