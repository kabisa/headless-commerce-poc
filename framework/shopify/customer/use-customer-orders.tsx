import useCustomerOrders, { UseCustomerOrders } from "@commerce/customer/use-customer-orders";
import { Customer } from "@commerce/types";
import { SWRHook } from "@commerce/utils/types";
import { getCustomerOrdersQuery, getCustomerToken } from "@framework/utils";
import { GetOrdersInput } from "@framework/schema";

export default useCustomerOrders as UseCustomerOrders<typeof handler>

export const handler: SWRHook<Customer | null, GetOrdersInput, GetOrdersInput> = {
  fetchOptions: {
    query: getCustomerOrdersQuery,
  },
  async fetcher({ options, fetch, input: {numberOfOrders, cursor} }) {
    const customerAccessToken = getCustomerToken()
    if (customerAccessToken) {
      const data = await fetch({
        ...options,
        variables: { customerAccessToken: getCustomerToken(), numberOfOrders: numberOfOrders, cursor: cursor },
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

