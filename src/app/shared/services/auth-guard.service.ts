import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {of} from 'rxjs/internal/observable/of';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private tokenStorage: TokenStorageService, private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const loginURL = route.data.permissions.loginURL;
    const nonAuthorisationURL = route.data.permissions.authorisationURL;
    const roules = route.data.permissions.only;
    let access: boolean;
    this.isLogged().subscribe(isLogged => {
      if (isLogged) {
        this.isAuthorized(roules).subscribe(isAuthorized => {
          if (isAuthorized) {
            console.log('canActivate return true');
            access = true;
          } else {
            console.log('user don\'t have permission');
            access = false;
            this.router.navigateByUrl(nonAuthorisationURL);
          }
        });
      } else {
        console.log('nobody is logged');
        access = false;
        this.router.navigateByUrl(loginURL);
      }
    });
    return access;
  }

  private isLogged(): Observable<boolean> {
    return this.tokenStorage.getAccessToken().pipe(
      map(res => {
        return !!res;
      })
    );
  }

  private isAuthorized(roules: string[]): Observable<boolean> {
    return this.tokenStorage.getUserRoles().pipe(
      map(res => {
        return roules.includes(res[0]);
      })
    );
  }
}
