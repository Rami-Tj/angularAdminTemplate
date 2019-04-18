import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Credentials} from '../../shared/models/credentials';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../shared/services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService, private router: Router,
    private tokenStorage: TokenStorageService,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(credentials: Credentials) {
    console.log(credentials);
    this.authService.login(credentials).subscribe(response => {
      if (typeof response !== 'undefined') {
        console.log(response);
        this.tokenStorage.getAccessToken().subscribe(res => console.log(res));
        this.tokenStorage.getUserRoles().subscribe(res => console.log(res));
        this.router.navigate(['/dashboard']);
      } else {
        // TODO: handle login failure
        console.log('login failed');
      }
    }, error => {
      console.log(error);
    });
  }
}
