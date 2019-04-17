import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Observable} from 'rxjs';
import {UsersFakeDb} from "./mock-db/users";

@Injectable()
export class MockApiService implements InMemoryDbService{

  constructor() { }

  createDb(): {} | Observable<{}> | Promise<{}> {
    return {
      // Users
      login: UsersFakeDb.users,
    };
  }
}
