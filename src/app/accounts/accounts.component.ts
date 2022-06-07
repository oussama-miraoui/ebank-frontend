import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFromGroup!: FormGroup
  currentPage: number = 0
  size: number = 5
  accountObservable!: Observable<AccountDetails>

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.accountFromGroup = this.formBuilder.group({
      accountId: this.formBuilder.control(null)
    })
  }

  handleSearchAccount() {
    let id: string = this.accountFromGroup.value.accountId

    this.accountObservable = this.accountService.getAccount(id, this.currentPage, this.size)
  }

}
