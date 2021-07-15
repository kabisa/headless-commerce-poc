import {OrderEdge, OrderLineItemEdge} from "@framework/schema";
import {Product} from "@commerce/types/product";
import _ from "lodash";
import {useCustomerOrders} from "@framework/customer";
import {useSearch} from "../framework/local/product";
import {useEffect, useState} from "react";

export function useRecommendedProduct(locale: string | undefined): Product | undefined {
  const [orderedBrands, setOrderedBrands] = useState<Array<string>>([])
  const [recommendedProduct, setRecommendedProduct] = useState<Product>()

  const { data: customerOrders } = useCustomerOrders({ numberOfOrders: 3 }) // Get customer orders

  const { data: recommendedProducts } = useSearch({ // Get products based on random ordered brand
    brandId: getRandomBrandId(orderedBrands), // If no ordered brands search for placeholder string (No results)
    locale,
  })

  useEffect(() => {
  customerOrders?.orders.edges.map((order: OrderEdge) => { // Iterate through orders
    order.node.lineItems.edges.map((item: OrderLineItemEdge) => { // Iterate through ordered items
      const vendor = item.node.variant?.product.vendor
      if (vendor && orderedBrands.indexOf(vendor) === -1) { // If vendor is known and doesn't exist in orderedBrands list yet
        setOrderedBrands(previousOrderedBrands => [...previousOrderedBrands, vendor]) // Collect list of ordered brands
      }
    })
  })
  }, [customerOrders?.orders.edges, orderedBrands])

  useEffect(() => {
    if (customerOrders?.orders.edges.length) {
      const randomProduct = _.sample(recommendedProducts?.products) // Take random recommended product from brand
      if (randomProduct) {
        randomProduct.recommended = true // Alter description of recommended product to mark it as recommended
        setRecommendedProduct(randomProduct)
      }
    }
  }, [customerOrders?.orders.edges, orderedBrands, recommendedProducts?.products])

  return recommendedProduct
}

export function addRecommendedProduct(products: Product[], recommendedProduct: Product | undefined): void {
  if (!products.some(product => product.recommended)) { // Check if no product has been recommended already
    const result = products.findIndex(product => { return product.id === recommendedProduct?.id }) // Check if recommended product already exists in list of products
    if (result != -1) { products.splice(result, 1) } // If it exists remove it
    if (recommendedProduct) { products.unshift(recommendedProduct) } // Add recommended product
  }
}

export function getRandomBrandId(orderedBrands: Array<string>) {
  return _.sample(orderedBrands) || '***---***';
}
