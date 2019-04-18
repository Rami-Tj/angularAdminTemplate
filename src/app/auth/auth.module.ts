import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthComponent} from './auth.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [],
})
export class AuthModule {
}
