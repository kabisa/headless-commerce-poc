import type {GetStaticPropsContext} from 'next'
import {Bag} from '@components/icons'
import {Layout} from '@components/common'
import {Container, Text} from '@components/ui'
import {getConfig} from '@framework/api'
import getAllPages from '@framework/common/get-all-pages'
import {FC} from "react";
import useCustomer from "@framework/customer/use-customer";
import {OrderEdge} from "@framework/schema";

export async function getStaticProps({
                                       preview,
                                       locale,
                                     }: GetStaticPropsContext) {
  const config = getConfig({locale})
  // console.log(config);
  const serializedConfig = JSON.stringify(config)
  const {pages} = await getAllPages({config, preview})
  // const customerToken = getCustomerToken()
  // const { orders } = await getCustomerOrders({customerToken, config })
  return {
    props: {pages},
  }
}

const Orders: FC = () => {
  // let locale = 'en-US';
  // const config = getConfig({locale})
  // const customerToken = getCustomerToken() || '';
  // console.log(customerToken);
  // const {data} = useCustomer();
  // console.log(data);

  const {data: customer, isLoading, error} = useCustomer()
  // const { data: customer } = useCustomer()
  // const customerOrders = customer.orders
  // console.log(customerOrders.orders.edges)
  console.log(customer)

  return (
    <Container>
      <Text variant="pageHeading">My Orders</Text>
      <div className="flex-1 p-24 flex flex-col justify-center items-center ">
        {customer && customer.orders.edges.length > 0 ?
          customer.orders.edges.map((order: OrderEdge) => (
            <li key={order.node.id}>
              <span> {order.node.name} </span>
              <span> {order.node.totalPrice} </span>
              <span> {order.node.fulfillmentStatus} </span>
            </li>))
          :
          <div className="flex-1 p-24 flex flex-col justify-center items-center ">
          <span
            className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
          <Bag className="absolute"/>
          </span>
            <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
              No orders found
            </h2>
            <p className="text-accents-6 px-10 text-center pt-2">
              Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
            </p>
          </div>
        }
      </div>
    </Container>
  )
}

// @ts-ignore
Orders.Layout = Layout

export default Orders
