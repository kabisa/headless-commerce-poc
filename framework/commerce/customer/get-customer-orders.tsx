import { useHook, useSWRHook } from '../utils/use-hook'
import { SWRFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, SWRHook } from '../utils/types'
import { Provider } from '..'
import {Customer} from "../types";

export type GetCustomerOrders<
  H extends SWRHook<any, any, any> = SWRHook<Customer | null>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<Customer | null, any> = SWRFetcher

const fn = (provider: Provider) => provider.customer?.useCustomer!

const getCustomerOrders: GetCustomerOrders = (input) => {
  const hook = useHook(fn)
  return useSWRHook({ fetcher, ...hook })(input)
}

export default getCustomerOrders
