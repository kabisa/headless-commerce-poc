import { FC } from 'react'
import { OrderEdge } from "@framework/schema";
import s from './OrderCard.module.css'

interface Props {
  order: OrderEdge
}

function getProductUrlFromTitle(title: string) { // Not the way! Have to get url from product
  return `/product/${title.toLowerCase() // Lower casing
    .replaceAll('/', ' ') // Replace spaces with dashes
    .replaceAll(/[^a-zA-Z ,1-9-]/g, "") // Remove special chars
    .replaceAll(' ', '-') // Replace spaces with dashes
    .replaceAll('--', '-')}` // Replace double dashes with single dash
}

// async function getProductUrlFromId(id: string, config, preview) {
  // const {product} = await getProduct({
  //   variables: {slug: params!.slug},
  //   config,
  //   preview,
  // })
// }

const OrderCard: FC<Props> = ({
  order,
  ...props
}) => (
    <div className={s.orderCard}>
    <h1 className={s.h1}>Order: {order.node.name}</h1>
    <h2 className={s.h2}>Total: {order.node.totalPrice} {order.node.currencyCode}</h2>
    <h3 className={s.h3}>Status: {order.node.fulfillmentStatus}</h3>
      <br/>
      <h3 className={s.h3}>Items</h3>
    {order.node.lineItems.edges && order.node.lineItems.edges.map((product) => (
      <div key={product.node.title}>
        <a href={getProductUrlFromTitle(product.node.variant!.product.title)}><h4>{product.node.title}: {product.node.quantity}x</h4></a>
      </div>
    ))}
  </div>
)

export default OrderCard
