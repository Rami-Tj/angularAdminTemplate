import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Credentials} from '../models/credentials';
import {AccessData} from '../models/access-data';
import {catchError, map, tap} from 'rxjs/operators';
import {TokenStorageService} from './token-storage.service';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = 'api';
  API_ENDPOINT_LOGIN = '/login';

  constructor(
    private http: HttpClient, private tokenStorage: TokenStorageService,
    private router: Router,
  ) {
  }

  login(credentials: Credentials): Observable<any> {
    let params = new HttpParams();
    params = params.append('username', credentials.username);
    params = params.append('password', credentials.password);
    return this.http.get<AccessData>(this.API_URL + this.API_ENDPOINT_LOGIN, {params: params}).pipe(
      map((result: any) => {
        if (result instanceof Array) {
          return result.pop();
        }
        return result;
      }),
      tap(this.saveAccessData.bind(this)),
      catchError(this.handleError('login'))
    );
  }

  logout() {
    this.tokenStorage.clear();
    this.router.navigate(['auth/login']);
  }

  private saveAccessData(accessData: AccessData) {
    if (typeof accessData !== 'undefined') {
      this.tokenStorage.setAccessToken(accessData.accessToken).setUserRoles(accessData.roles);
      // this.onCredentialUpdated$.next(accessData);
    }
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
