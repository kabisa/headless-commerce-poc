import useCustomerOrders, { UseCustomerOrders } from "@commerce/customer/use-customer-orders";
import { Customer } from "@commerce/types";
import { SWRHook } from "@commerce/utils/types";
import { getCustomerOrdersQuery, getCustomerToken } from "@framework/utils";

export default useCustomerOrders as UseCustomerOrders<typeof handler>

export const handler: SWRHook<Customer | null> = {
  fetchOptions: {
    query: getCustomerOrdersQuery,
  },
  async fetcher({ options, fetch }) {
    const customerAccessToken = getCustomerToken()
    if (customerAccessToken) {
      const data = await fetch({
        ...options,
        variables: { customerAccessToken: getCustomerToken() },
      })
      return data.customer
    }
    return null
  },
  useHook: ({ useData }) => (input) => {
    return useData({
      swrOptions: {
        revalidateOnFocus: false,
        ...input?.swrOptions,
      },
    })
  },
}

