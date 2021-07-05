import { GraphQLFetcherResult } from '@commerce/api'
import { ShopifyConfig } from '../api'
import {ProductEdge, ProductSortKeys} from '../schema'
import { getAllProductsQuery } from '../utils/queries'
import { normalizeProduct } from '@framework/utils'
import { Product } from '@commerce/types'
import commerce from "@lib/api/commerce";

type Variables = {
  first?: number
  field?: string
  query?: string
  sortKey?: ProductSortKeys | string
  reverse?: boolean
}

type ReturnType = {
  // @ts-ignore
  products: Product[]
}

const getAllProducts = async (options: {
  variables?: Variables
  config?: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = commerce.getConfig()

  const { data }: GraphQLFetcherResult = await config.fetch(
    getAllProductsQuery,
    { variables }
  )

  const products = data.products?.edges?.map(({ node: p }: ProductEdge) =>
    normalizeProduct(p)
  )

  return {
    products,
  }
}

export default getAllProducts
