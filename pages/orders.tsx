import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import { useCustomerOrders } from "@framework/customer";
import { Bag } from "@components/icons";
import OrderCard from "@components/orders/OrderCard";
import { useEffect, useState } from "react";
import {getCustomerOrdersQuery, getCustomerToken} from "@framework/utils";
import fetch from "node-fetch";
import throttle from "lodash.throttle"
import {Customer} from "@framework/schema";

let numberOfOrders = 1;

export default function Orders() {
  const [{ data }, setData] = useState(useCustomerOrders({ numberOfOrders: numberOfOrders }));
  // let data = useCustomerOrders({ numberOfOrders: numberOfOrders }).data

  console.log(data)

  const loadNextPage = async (customer: Customer) => {
    // if (data?.orders?.pageInfo?.hasNextPage) {
      numberOfOrders = numberOfOrders + 1;

      console.log('doLoad!');

      console.log(customer);

      console.log(numberOfOrders);

      const body = {
        variables: {customerAccessToken: getCustomerToken(), numberOfOrders: numberOfOrders},
        query: getCustomerOrdersQuery
      };

      const headers = {
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.toString() || '',
        'Content-Type': 'application/json',
      }

      const response = fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || ''}/api/2021-04/graphql.json`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers
      })

      const dataObj = await response.then(response => { return response.json() }).then(data => { return { data: data.data.customer } })

      console.log(dataObj);

      setData(dataObj)

      // data = dataObj
    // }
  }

  useEffect(() => {
    let didLoad = false;
    const footer = document.getElementsByTagName('footer')[0]
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - footer.offsetHeight)) {
        console.log(data);
        if (data?.orders.pageInfo.hasNextPage) {
        if (!didLoad) {
          void loadNextPage(data)
          didLoad = true;
          setTimeout(function(){ didLoad = false }, 1000);
        }
        }
      }
    })
  }, [data])


  return (
    <Container>
      {/*{JSON.stringify(data)}*/}
      <Text variant="pageHeading">My Orders</Text>
      <div className="flex-1 pt-4 lg:px-24 sm:px-12 flex flex-col flex-wrap 2xl:flex-row justify-center md:items-start gap-4 items-center">
        {data && data.orders.edges.length > 0 ?
          data.orders.edges.map((order) => (
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
            <p className="text-accents-6 px-10 text-center pt-2">
              Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
            </p>
          </div>
        }
        {data && data.orders.pageInfo.hasNextPage && <button onClick={() => loadNextPage(data)}>Load next</button>}
      </div>
    </Container>
  )
}

Orders.Layout = Layout
