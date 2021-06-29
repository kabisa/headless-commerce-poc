// TODO: define this type
import {SignupBody} from "@commerce/types/signup";

export type Customer = any

export type CustomerTypes = {
  customer: Customer
}

export type CustomerHook<T extends CustomerTypes = CustomerTypes> = {
  data: T['customer'] | null
  fetchData: { customer: T['customer'] } | null
}

export type CustomerOrdersInput = {
  numberOfOrders: number,
  cursor?: string | null
}

export type CustomerOrdersHook<T extends CustomerTypes = CustomerTypes> = {
  data: T['customer'] | null
  fetchData: { customer: T['customer'] } | null
  input: CustomerOrdersInput
  fetcherInput: CustomerOrdersInput
}

export type CustomerSchema<T extends CustomerTypes = CustomerTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getLoggedInCustomer: {
        data: { customer: T['customer'] } | null
      }
    }
  }
}
