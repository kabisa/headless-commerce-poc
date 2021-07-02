import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import {getAllProductsQuery} from "@framework/utils";
import doFetch from "./doFetch";
import { config } from "dotenv";
import getProductsData from "../cypress/fixtures/getAllProductsData.json"
import {ProductConnection} from "@framework/schema";
import { expect } from '@jest/globals';

beforeAll(() => {
  config({path: '.env.local'})
})

test('Retrieve products', async () => {

  fetchMock.mockResponseOnce(JSON.stringify(getProductsData))

  const body = { variables: { first: 4 }, query: getAllProductsQuery };

  const response = await doFetch('post', body);

  const data = await response.json();

  const products: ProductConnection = data.data.products;

  expect(products.edges.length).toBe(body.variables.first);
});
