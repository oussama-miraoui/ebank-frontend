import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Account } from '../model/account.model';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts!: Observable<Array<Account>>
  errorMessage!: object

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accounts = this.accountService.getAccounts().pipe(
      catchError(err => {
        this.errorMessage = err
        return throwError(err)
      })
    )

  }

}
