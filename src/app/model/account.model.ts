import { Customer } from "./customer.model"

export interface Account {
    id: string
    type: string
    balance: number
    createdAt: Date
    overDraft: number
    interestRate: number
    customer: Customer
}