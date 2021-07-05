import { useHook, useSWRHook } from '../utils/use-hook'
import { SWRFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, SWRHook } from '../utils/types'
import { Provider } from '..'
import {Customer} from "@commerce/types";
import {CustomerHook, CustomerOrdersHook} from "@commerce/types/customer";

export type UseCustomerOrders<
  H extends SWRHook<CustomerOrdersHook<any>> = SWRHook<CustomerOrdersHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<CustomerOrdersHook> = SWRFetcher

const fn = (provider: Provider) => provider.customer?.useCustomerOrders!

const useCustomerOrders: UseCustomerOrders = (input) => {
  const hook = useHook(fn)
  return useSWRHook({ fetcher, ...hook })(input)
}

export default useCustomerOrders
