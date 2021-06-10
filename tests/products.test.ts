import {getAllProductsQuery} from "@framework/utils";
import { ProductConnection } from "@framework/schema";
import doFetch from "./doFetch";

const fetch = require('node-fetch');

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

beforeAll(() => {
  require('dotenv').config({path: '.env.local'})
})

test('Retrieve products', async () => {

  const body = { variables: { first: 12 }, query: getAllProductsQuery };

  const response = await doFetch('post', body);

  const data = await response.json();

  const products: ProductConnection = data.data.products;

  // // console.log(products);
  //
  // products.edges.map(product => {
  //   console.log(product);
  // });

  expect(products.edges.length).toBe(body.variables.first);
});
