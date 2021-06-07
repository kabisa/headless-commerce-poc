import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import { useCustomerOrders } from "@framework/customer";
import { Bag } from "@components/icons";
import OrderCard from "@components/orders/OrderCard";

export default function Orders() {
  const { data } = useCustomerOrders()

  console.log(data)

  return (
    <Container>
      <Text variant="pageHeading">My Orders</Text>
      <div className="flex-1 p-24 flex flex-col justify-center items-center ">
        {data && data.orders.edges.length > 0 ?
          data.orders.edges.map((order) => (
            <OrderCard key={order.node.id} order={order}/>
          ))
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

Orders.Layout = Layout
