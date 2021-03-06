import { Layout } from '@components/common'
import { Container, Skeleton, Text } from '@components/ui'
import { useCustomerOrders } from "@framework/customer";
import { Bag } from "@components/icons";
import OrderCard from "@components/orders/OrderCard";
import { useEffect, useState } from "react";
import { OrderEdge } from "@framework/schema";
import throttle from "lodash.throttle";
import { useRouter } from "next/router";
import rangeMap from "@lib/range-map";

const loadingPlaceholder = rangeMap(4, (i) => {
  return <Skeleton key={i} style={{width: '100%', minHeight: '600px', marginTop: '1em', flexShrink: 1, flexBasis: '49%'}} duration={'4s'}/>
});

export default function Orders(): JSX.Element {
  const [cursor, setCursor]     = useState<string | null>(null);
  const [orders, setOrders]     = useState<OrderEdge[]>([])
  const [atBottom, setAtBottom] = useState<boolean>(false)
  const [hasLoaded, setHasLoaded] = useState<boolean>(false)
  const router = useRouter()

  const { data, isLoading } = useCustomerOrders({ numberOfOrders: 10, cursor } )

  useEffect(() => { // When scrolled to bottom, if there are more items available, load them by setting new cursor
    if (atBottom) {
      if (orders.length && data?.orders.pageInfo.hasNextPage) {
        void router.push({ pathname: router.pathname }, undefined, { shallow: true }) // Trigger loader
        setCursor(orders[orders.length - 1].cursor)
      }
    }
    setAtBottom(false)
  }, [atBottom, data?.orders.pageInfo.hasNextPage, orders, orders.length, router])

  useEffect(() => { // Append new orders to previous orders
    if (!data?.orders.edges) return;
    setHasLoaded(true)
    setOrders(prevOrders => [...prevOrders, ...data.orders.edges])
  }, [data?.orders.edges])

  useEffect(() => { // Scroll eventListener for when at bottom of list
    const footer = document.getElementsByTagName('footer')[0]

    const scrollListener = throttle(function () {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - footer.offsetHeight)) {
        setAtBottom(true);
      } }, 500);

    window.addEventListener('scroll', scrollListener)

    return function cleanup() {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <Container>
      <Text variant="pageHeading">My Orders</Text>
      <div className="flex-1 pt-4 lg:px-24 sm:px-12 flex flex-col flex-wrap 2xl:flex-row justify-center md:items-start gap-4 items-center">
        {!isLoading || hasLoaded ? <>
        {orders.length ? orders.map((order) => (
            <OrderCard key={order.node.id} order={order}/>
          ))
          :
          <div className="flex-1 px-4 py-24 sm:p-24 self-center flex flex-col justify-center items-center ">
          <span
            className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
          <Bag className="absolute"/>
          </span>
            <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
              No orders found
            </h2>
            <p className="text-accent-6 px-10 text-center pt-2">
              Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
            </p>
          </div>
        }
          </>
          : loadingPlaceholder }
      </div>
    </Container>
  )
}

Orders.Layout = Layout
