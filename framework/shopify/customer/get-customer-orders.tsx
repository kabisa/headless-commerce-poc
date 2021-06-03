import {getCustomerOrdersQuery, getCustomerToken} from "@framework/utils";
import {SWRHook} from "@commerce/utils/types";
import getCustomerOrders, {GetCustomerOrders} from "@commerce/customer/get-customer-orders";

export default getCustomerOrders as GetCustomerOrders<typeof handler>

export const handler: SWRHook<any | null> = {
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
      return data.orders
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

