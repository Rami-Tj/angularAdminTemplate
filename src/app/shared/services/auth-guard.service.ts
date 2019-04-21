import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
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
    const roles = route.data.permissions.only;
    let access = false;
    this.isLogged().subscribe(isLogged => {
      if (isLogged) {
        this.isAuthorized(roles).subscribe(isAuthorized => {
          if (isAuthorized) {
            console.log('canActivate return true');
            access = true;
          } else {
            console.log('user don\'t have permission');
            this.router.navigateByUrl(nonAuthorisationURL);
          }
        });
      } else {
        console.log('nobody is logged');
        this.router.navigateByUrl(loginURL).then();
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
        return this.checkRoles(roules, res);
      })
    );
  }

  private checkRoles(authorizedRoles: string[], userRoles: string | string[]): boolean {
    if (userRoles instanceof Array) {
      console.log('userRoles type array');
      for (let i = 0; i < userRoles.length; i++) {
        if (authorizedRoles.includes(userRoles[i])) {
          console.log('one match');
          return true;
          break;
        }
        console.log('zero match');
        return false;
      }
    } else {
      console.log('userRoles type other');
      return authorizedRoles.includes(userRoles);
    }
  }
}
