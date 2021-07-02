import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import { getCustomerOrdersQuery } from "@framework/utils";
import { Customer } from "@framework/schema";
import { customerAccessTokenCreate } from "./customerAccessTokenCreate";
import doFetch from "./doFetch";
import { expect } from '@jest/globals';
import { config } from "dotenv";
import customerAccessTokenCreateData from "../cypress/fixtures/customerAccessTokenCreateData.json";
import customerOrdersData from "../cypress/fixtures/getCustomerOrdersData.json";

beforeAll(() => {
  config({ path: '.env.local' })
})

let customerAccessToken: string;

test('customerAccessTokenCreate', async () => {
  customerAccessToken = await customerAccessTokenCreate();

  expect(customerAccessToken).not.toBe(undefined)
  expect(customerAccessToken.length).toBe(32)
})

test('retrieve orders', async () => {
  if (!customerAccessToken) { customerAccessToken = await customerAccessTokenCreate(); }

  fetchMock.mockResponseOnce(JSON.stringify(customerOrdersData))

  const orderBody = { variables: { customerAccessToken: customerAccessToken, numberOfOrders: 3 }, query: getCustomerOrdersQuery };

  const orderResponse = await doFetch('post', orderBody);

  const orderData = await orderResponse.json();

  const customer: Customer = orderData.data.customer

  const orders = customer.orders;

  expect(orders.edges.length).toBe(orderBody.variables.numberOfOrders);
});
