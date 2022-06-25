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
  operationFormGroup!: FormGroup
  currentPage: number = 0
  size: number = 5
  accountObservable!: Observable<AccountDetails>
  errorMessage!: string

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.accountFromGroup = this.formBuilder.group({
      accountId: this.formBuilder.control(null)
    })

    this.operationFormGroup = this.formBuilder.group({
      operationType: this.formBuilder.control(null),
      amount: this.formBuilder.control(0),
      description: this.formBuilder.control(null),
      accountDestination: this.formBuilder.control(null)
    })
  }

  handleSearchAccount() {
    let id: string = this.accountFromGroup.value.accountId

    this.accountObservable = this.accountService.getAccount(id, this.currentPage, this.size)

    this.operationFormGroup.reset()
  }
  goToPage(page: number) {
    this.currentPage = page
    this.handleSearchAccount()
  }
  next() {
    this.currentPage++
    this.handleSearchAccount()
  }
  previous() {
    this.currentPage--
    this.handleSearchAccount()
  }

  handleAccountOperation() {
    let accountId: string = this.accountFromGroup.value.accountId
    let operationType = this.operationFormGroup.value.operationType
    let amount: number = this.operationFormGroup.value.amount
    let description: string = this.operationFormGroup.value.description
    let accountDestination: string = this.operationFormGroup.value.accountDestination

    if (operationType == "DEBIT") {
      this.accountService.debit(accountId, amount, description).subscribe({
        next: data => {
          alert("yaaaaaaaaaay")
          this.handleSearchAccount()
        },
        error: err => {
          alert(err.message)
        }
      })
    } else if (operationType == "CREDIT") {
      this.accountService.credit(accountId, amount, description).subscribe({
        next: data => {
          alert("yaaaaaaaaaay")
          this.handleSearchAccount()
        },
        error: err => {
          alert(err)
        }
      })

    } else if (operationType == "TRANSFER") {
      this.accountService.transfer(accountId, accountDestination, amount, description).subscribe({
        next: data => {
          alert("yaaaaaaaaaay")
          this.handleSearchAccount()
        },
        error: err => {
          alert(err)
        }
      })
    }
    this.operationFormGroup.reset()
  }
}

