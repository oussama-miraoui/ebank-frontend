import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  public getAccounts(): Observable<Array<Account>> {
    return this.http.get<Array<Account>>('http://localhost:8081/accounts')
  }
}
