import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from './services/auth.service';
import {TokenStorageService} from './services/token-storage.service';
import {AuthGuardService} from './services/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    AuthService,
    TokenStorageService,
    AuthGuardService,
  ]
})
export class SharedModule { }
