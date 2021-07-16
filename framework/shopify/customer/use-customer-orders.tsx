import useCustomerOrders, { UseCustomerOrders } from "@commerce/customer/use-customer-orders";
import { SWRHook } from "@commerce/utils/types";
import { getCustomerOrdersQuery, getCustomerToken } from "@framework/utils";
import { GetCustomerOrdersQuery, GetCustomerOrdersQueryVariables } from "@framework/schema";
import { CustomerOrdersHook } from "@commerce/types/customer";

export default useCustomerOrders as UseCustomerOrders<typeof handler>

export const handler: SWRHook<CustomerOrdersHook> = {
  fetchOptions: {
    query: getCustomerOrdersQuery,
  },
  async fetcher({ options, fetch, input: { numberOfOrders, cursor } }) {
    const customerAccessToken = getCustomerToken()
    if (customerAccessToken) {
      const data = await fetch<GetCustomerOrdersQuery, GetCustomerOrdersQueryVariables>({
        ...options,
        variables: { customerAccessToken: customerAccessToken, numberOfOrders: numberOfOrders, cursor: cursor },
      })
      return data.customer
    }
    return null
  },
  useHook: ({ useData }) => (input) => {
    const { numberOfOrders, cursor } = input || {}

    return useData({
      input: {
        numberOfOrders,
        cursor,
      },
      swrOptions: {
        revalidateOnFocus: false,
        ...input?.swrOptions,
      },
    })
  },
}

