import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service'
declare const alertify: any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers!: Observable<Array<Customer>>
  errorMessage!: object
  searchFormGroup!: FormGroup

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.searchFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control("")
    })

    this.customers = this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err.message
        return throwError(err);
      })
    )
  }

  handleSearchCustomers() {
    let keyword = this.searchFormGroup?.value.keyword

    this.customers = this.customerService.searchCustomers(keyword).pipe(
      catchError(err => {
        this.errorMessage = err.message
        return throwError(err);
      })
    )
  }

  handleDeleteCustomer(customer: Customer) {
    this.customerService.deleteCustomer(customer.id).subscribe({
      next: (res) => {
        this.customers = this.customers.pipe(
          map(data => {
            let index = data.indexOf(customer)
            data.slice(index, 1)
            alertify.success("Customer deleted!")
            return data
          })
        )
      },
      error: err => this.errorMessage = err.message
    })
  }

}
