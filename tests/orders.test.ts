import { getCustomerOrdersQuery } from "@framework/utils";
import { OrderConnection } from "@framework/schema";
import { customerAccessTokenCreate } from "./customerAccessTokenCreate";
import doFetch from "./doFetch";
import { expect } from '@jest/globals';

beforeAll(() => {
  require('dotenv').config({path: '.env.local'})
})

let customerAccessToken: string;

test('customerAccessTokenCreate', async () => {
  customerAccessToken = await customerAccessTokenCreate();

  expect(customerAccessToken).not.toBe(undefined)
  expect(customerAccessToken.length).toBe(32)
})

test('retrieve orders', async () => {

  if (!customerAccessToken) { await customerAccessTokenCreate(); }

  const orderBody = { variables: { customerAccessToken: customerAccessToken, numberOfOrders: 5 }, query: getCustomerOrdersQuery };

  const orderResponse = await doFetch('post', orderBody);

  const orderData = await orderResponse.json();

  const orders: OrderConnection = orderData.data.customer.orders;

  // console.log(orders);
  //
  // orders.edges.map(order => {
  //   console.log(order);
  // });

  expect(orders.edges.length).toBe(orderBody.variables.numberOfOrders);
});