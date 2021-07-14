import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useCustomerOrders } from "@framework/customer";
import React, { useEffect, useState } from "react";
import useSearch from "@framework/product/use-search";
import { collectOrderedBrands, getRecommendedProduct } from "@lib/recommendations";
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
  const [productList, setProductList] = useState<typeof products>(products)

  const { data: customerOrders } = useCustomerOrders({ numberOfOrders: 3 }) // Get customer orders

  const { data: recommendedProducts } = useSearch({ // Get products based on random ordered brand
    brandId: _.sample(orderedBrands) || '***---***', // If no ordered brands search for placeholder string (No results)
    locale,
  })

  useEffect(() => {
    collectOrderedBrands(customerOrders, orderedBrands, setOrderedBrands);
  }, [customerOrders?.orders.edges, orderedBrands])

  useEffect(() => {
    getRecommendedProduct(customerOrders, recommendedProducts, productList, setProductList);
  }, [customerOrders, productList, recommendedProducts])

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
        products={productList}
        categories={categories}
        brands={brands}
      />
    </>
  )
}

Home.Layout = Layout
