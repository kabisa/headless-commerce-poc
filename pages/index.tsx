import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useCustomerOrders } from "@framework/customer";
import { OrderEdge, OrderLineItemEdge } from "@framework/schema";
import React, { useEffect, useState } from "react";
import useSearch from "@framework/product/use-search";
import _ from "lodash";

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }

  const productsPromise = commerce.getAllProducts({
    variables: { first: 12, sortKey: 'UPDATED_AT', reverse: true },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })

  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
      locale,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
  categories,
  brands,
  locale
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [orderedBrands, setOrderedBrands] = useState<Array<string>>([])

  const { data: customerOrders } = useCustomerOrders({ numberOfOrders: 3 } ) // Get customer orders

  const { data: recommendedProducts } = useSearch({ // Get products based on random ordered brand
    brandId: _.sample(orderedBrands),
    locale,
  })

  useEffect(() => {
    customerOrders?.orders.edges.map((order: OrderEdge) => { // Iterate through orders and brands
      order.node.lineItems.edges.map((item: OrderLineItemEdge) => {
        if (item.node.variant?.product.vendor && orderedBrands.indexOf(item.node.variant?.product.vendor) === -1) {
          orderedBrands.push(item.node.variant?.product.vendor) // Collect ordered brands
          setOrderedBrands(orderedBrands) // Set ordered brands
        }
      })
    })
  }, [customerOrders?.orders.edges, orderedBrands])

  useEffect(() => {
    const recommendedProduct = _.sample(recommendedProducts?.products) // Take random recommended product from brand
    if (recommendedProduct) {
      const result = products.findIndex(product => { return product.id === recommendedProduct?.id}) // Check if recommended product already exists in list of products
      if (result != -1) { products.splice(result, 1) } // If it exists remove it
      recommendedProduct.description += '-recommended-' // Alter description of recommended product to mark it as recommended
      if (!products.some(product => product.description?.includes('-recommended-'))) { // Check if no product has been recommended already
        products.unshift(recommendedProduct) // Add recommended product to beginning of list
      }
    }
  }, [products, recommendedProducts?.products])

  return (
    <>
      {/*Commented because of alternate homepage layout*/}
      {/*<Grid variant="filled">*/}
      {/*  {products.slice(0, 3).map((product: any, i: number) => (*/}
      {/*    <ProductCard*/}
      {/*      key={product.id}*/}
      {/*      product={product}*/}
      {/*      imgProps={{*/}
      {/*        width: i === 0 ? 1080 : 540,*/}
      {/*        height: i === 0 ? 1080 : 540,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</Grid>*/}
      {/*<Marquee variant="secondary">*/}
      {/*  {products.slice(0, 3).map((product: any, i: number) => (*/}
      {/*    <ProductCard key={product.id} product={product} variant="slim" />*/}
      {/*  ))}*/}
      {/*</Marquee>*/}
      {/*<Hero*/}
      {/*  headline=" Dessert dragée halvah croissant."*/}
      {/*  description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "*/}
      {/*/>*/}
      {/*<Grid layout="B" variant="filled">*/}
      {/*  {products.slice(0, 3).map((product: any, i: number) => (*/}
      {/*    <ProductCard*/}
      {/*      key={product.id}*/}
      {/*      product={product}*/}
      {/*      imgProps={{*/}
      {/*        width: i === 0 ? 1080 : 540,*/}
      {/*        height: i === 0 ? 1080 : 540,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</Grid>*/}
      {/*<Marquee>*/}
      {/*  {products.slice(3).map((product: any, i: number) => (*/}
      {/*    <ProductCard key={product.id} product={product} variant="slim" />*/}
      {/*  ))}*/}
      {/*</Marquee>*/}
       <HomeAllProductsGrid
        products={products}
        categories={categories}
        brands={brands}
      />
    </>
  )
}

Home.Layout = Layout
