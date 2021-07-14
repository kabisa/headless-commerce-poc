import {Customer} from "@commerce/types/customer";
import {OrderEdge, OrderLineItemEdge} from "@framework/schema";
import {Product} from "@commerce/types/product";
import _ from "lodash";

export function collectOrderedBrands(customerOrders: Customer, orderedBrands: Array<string>, setOrderedBrands: (value: (((prevState: Array<string>) => Array<string>) | Array<string>)) => void) {
  customerOrders?.orders.edges.map((order: OrderEdge) => { // Iterate through orders
    order.node.lineItems.edges.map((item: OrderLineItemEdge) => { // Iterate through ordered items
      if (item.node.variant?.product.vendor && orderedBrands.indexOf(item.node.variant.product.vendor) === -1) { // If vendor is known and doesn't exist in orderedBrands list yet
        const vendor = item.node.variant.product.vendor
        setOrderedBrands(previousOrderedBrands => [...previousOrderedBrands, vendor]) // Collect list of ordered brands
      }
    })
  })
}

export function getRecommendedProduct(customerOrders: Customer, recommendedProducts: { products: Product[]; found: boolean; } | undefined, productList: Product[], setProductList: (value: (((prevState: any) => any) | any)) => void) {
  if (customerOrders?.orders.edges.length) {
    const recommendedProduct = _.sample(recommendedProducts?.products) // Take random recommended product from brand
    if (recommendedProduct) {
      const productListCopy = [...productList]
      const result = productListCopy.findIndex(product => { return product.id === recommendedProduct?.id }) // Check if recommended product already exists in list of products
      if (result != -1) { productListCopy.splice(result, 1) } // If it exists remove it
      recommendedProduct.description += '-recommended-' // Alter description of recommended product to mark it as recommended
      if (!productListCopy.some(product => product.description?.includes('-recommended-'))) { // Check if no product has been recommended already
        setProductList([recommendedProduct, ...productListCopy]) // Add recommended product to beginning of list
      }
    }
  }
}

export function getRandomBrandId(orderedBrands: Array<string>) {
  return _.sample(orderedBrands) || '***---***';
}
