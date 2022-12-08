import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private timer: any;

  private urlSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjepSbScL0GWcU-FFBZIMFDQduuTp-1gg';
  private urlSingIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjepSbScL0GWcU-FFBZIMFDQduuTp-1gg';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.urlSignUp,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuth(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        )
      })
    )
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.urlSingIn,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuth(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        )
      })
    )
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');

    if (!userData) {
      return;
    }

    const user: {
      email: string;
      id: string;
      _token: string,
      _tokenExpDate: string
    } = JSON.parse(userData);

    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpDate)
    );

    if (loadedUser.token) {
      const expDuration =
        new Date(user._tokenExpDate).getTime() -
        new Date().getTime();
      this.autoLogout(expDuration)
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = null;
  }

  autoLogout(expDuration: number) {
    this.timer = setTimeout(() => {
      this.logout();
    }, expDuration);
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Ошибка';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email is exist';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
    }

    return throwError(errorMessage);
  }
}
