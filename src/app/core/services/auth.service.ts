import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

import { LoggerService } from './logger.service';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';
import { ErrorResponse } from './../models/error-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = environment.baseUrl;
  private readonly LOGIN_PATH = environment.api.login;
  private readonly REGISTER_PATH = environment.api.signup;
  private readonly _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private loggerService: LoggerService) {}

  login(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.BASE_URL}${this.LOGIN_PATH}`, user).pipe(
      tap(({ access_token: token }) => {
        this._isLoggedIn$.next(true);
        this.saveToken(token);
      }),
      catchError(this.handleError<Token>('Login')),
    );
  }

  register(newUser: User): Observable<User> {
    return this.http
      .post<User>(`${this.BASE_URL}${this.REGISTER_PATH}`, newUser)
      .pipe(catchError(this.handleError<User>('Register')));
  }

  isLoggedIn(): boolean {
    // TODO: check with the api if the token still valid
    const isLoggedIn = !!this.getToken();
    if (isLoggedIn !== this._isLoggedIn$.value) {
      this._isLoggedIn$.next(isLoggedIn);
    }

    return isLoggedIn;
  }

  logOut(): void {
    localStorage.removeItem('token');
    this._isLoggedIn$.next(false);
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  get isLoggedIn$() {
    return this._isLoggedIn$.asObservable();
  }

  private handleError<T>(operation = 'operation') {
    return (errorResponse: HttpErrorResponse): Observable<T> => {
      const errorInfo = errorResponse.error as ErrorResponse;
      const errorMessage = errorInfo.message || 'Unknown error occurred';

      this.loggerService.handleError(`${operation} failed: ${errorMessage}`);

      return throwError(() => new Error(`${operation} failed: ${errorMessage}`));
    };
  }
}
