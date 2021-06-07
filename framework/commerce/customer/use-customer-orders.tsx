import { useHook, useSWRHook } from '../utils/use-hook'
import { SWRFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, SWRHook } from '../utils/types'
import { Provider } from '..'
import {Customer} from "@commerce/types";
import {Order} from "@framework/schema";

export type UseCustomerOrders<
  H extends SWRHook<any, any, any> = SWRHook<Customer | null>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<Customer | null, any> = SWRFetcher

const fn = (provider: Provider) => provider.customer?.useCustomerOrders!

const useCustomerOrders: UseCustomerOrders = (input) => {
  const hook = useHook(fn)
  return useSWRHook({ fetcher, ...hook })(input)
}

export default useCustomerOrders
