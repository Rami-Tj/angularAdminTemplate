import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable()
export class TokenStorageService {

  constructor() {
  }

  public getAccessToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('accessToken');
    return of(token);
  }

  public setAccessToken(token: string): TokenStorageService {
    localStorage.setItem('accessToken', token);

    return this;
  }

  // public getRefreshToken(): Observable<string> {
  //   const token: string = <string>localStorage.getItem('refreshToken');
  //   return of(token);
  // }

  // public setRefreshToken(token: string): TokenStorageService {
  //   localStorage.setItem('refreshToken', token);
  //
  //   return this;
  // }

  public getUserRoles(): Observable<any> {
    const roles: any = localStorage.getItem('userRoles');
    try {
      return of(JSON.parse(roles));
    } catch (e) {
    }
  }

  public setUserRoles(roles: any): any {
    if (roles != null) {
      localStorage.setItem('userRoles', JSON.stringify(roles));
    }

    return this;
  }

  public clear() {
    localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRoles');
  }
}
