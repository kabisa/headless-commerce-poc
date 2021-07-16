import {OrderEdge, OrderLineItemEdge} from "@framework/schema";
import {Product} from "@commerce/types/product";
import {useCustomerOrders} from "@framework/customer";
import {useSearch} from "../framework/local/product";
import {Customer} from "@commerce/types/customer";

export function useProductsWithRecommendation(products: Product[]): Product[] {
    const customerOrders = fetchCustomerOrders({ numberOfOrders: 3 }) // Get customer orders

    const orderedBrands = determineOrderedBrands(customerOrders) // Collect list of ordered brands

    const recommendedProduct = fetchRecommendedProduct(orderedBrands) // Fetch products from that brand

    const productsToRecommend = combineProducts(products, recommendedProduct)

    return productsToRecommend
}

function fetchCustomerOrders({numberOfOrders}: { numberOfOrders: number }): Customer {
    const {data} = useCustomerOrders({ numberOfOrders: numberOfOrders })
    return data?.orders.edges
}

function determineOrderedBrands(customerOrders: OrderEdge[]): string[] {
    const orderedBrands: string[] = [];
    customerOrders?.map((order: OrderEdge) => { // Iterate through orders
        order.node.lineItems.edges.map((item: OrderLineItemEdge) => { // Iterate through ordered items
            const vendor = item.node.variant?.product.vendor
            if (vendor && orderedBrands.indexOf(vendor) === -1) { // If vendor is known and doesn't exist in orderedBrands list yet
                orderedBrands.push(vendor) // Collect list of ordered brands
            }
        })
    })
    return orderedBrands
}

function fetchRecommendedProduct(orderedBrands: string[]): Product {
    const {data} = useSearch({ // Get products based on random ordered brand
        brandId: orderedBrands[Math.floor(Math.random() * orderedBrands.length)] || '***---***', // If no ordered brands search for placeholder string (No results)
    })
    const randomProduct = data?.products?.[Math.floor(Math.random() * data?.products.length)]; // Take random recommended product from brand
    if (randomProduct) {
        randomProduct.recommended = true // Alter description of recommended product to mark it as recommended
    }
    return randomProduct
}

function combineProducts(products: Product[], recommendedProduct: Product) {
    if (recommendedProduct && !products.some(product => product.recommended)) { // Check if no product has been recommended already
        const result = products.findIndex(product => { return product.id === recommendedProduct.id }) // Check if recommended product already exists in list of products
        if (result != -1) { products.splice(result, 1) } // If it exists remove it
        products.unshift(recommendedProduct)
    }
    return products
}
