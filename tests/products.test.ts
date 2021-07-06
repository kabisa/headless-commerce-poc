import fetchMock from "jest-fetch-mock";
import {getAllProductsQuery, normalizeProduct} from "@framework/utils";
import doFetch from "./doFetch";
import getProductsData from "../cypress/fixtures/getAllProductsData.json"
import {MoneyV2, ProductConnection} from "@framework/schema";
import { expect } from '@jest/globals';

test('Retrieve products', async () => {

  fetchMock.mockResponseOnce(JSON.stringify(getProductsData))

  const body = { variables: { first: 4 }, query: getAllProductsQuery };

  const response = await doFetch('post', body);

  const data = await response.json();

  const products: ProductConnection = data.data.products;

  expect(products.edges.length).toBe(body.variables.first);
});

test('Normalize products', async () => {

    fetchMock.mockResponseOnce(JSON.stringify(getProductsData))

    const body = { variables: { first: 4 }, query: getAllProductsQuery };

    const response = await doFetch('post', body);

    const data = await response.json();

    const products: ProductConnection = data.data.products;

    products.edges.forEach(product => {
        const normalizedProduct = normalizeProduct(product.node);

        expect(normalizedProduct.name).toBe(product.node.title)
        expect(normalizedProduct.slug).toBe(product.node.handle)
        expect(normalizedProduct.price).toStrictEqual({
            value: +product.node.priceRange.minVariantPrice.amount,
            currencyCode: product.node.priceRange.minVariantPrice.currencyCode,
        })
    })

    expect(products.edges.length).toBe(body.variables.first);
});
