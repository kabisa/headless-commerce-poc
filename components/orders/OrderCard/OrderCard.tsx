import { FC } from 'react'
import { OrderEdge } from "@framework/schema";
import s from './OrderCard.module.css'
import { capitalize } from "@lib/capitalize";
import getProduct from "@framework/product/get-product";

interface Props {
  order: OrderEdge
}

const OrderCard: FC<Props> = ({
  order,
  ...props
}) => (
    <div className={s.orderCard}>
    <h1 className={s.orderName}>Order: {order.node.name}</h1>
    <p className={s.orderTotal}>Total: {order.node.totalPrice} {order.node.currencyCode}</p>
    <p className={s.orderStatus}>Status: <span className={order.node.fulfillmentStatus.toLowerCase() == 'fulfilled' ? s.fulfilled : ''}>{capitalize(order.node.fulfillmentStatus)}</span></p>
      <p className={s.orderDate}>{new Date(Date.parse(order.node.processedAt)).toDateString()}</p>
      <br/>
      <p className={s.orderProducts}>Items:</p>
      <div className={s.orderItems}>
    {order.node.lineItems.edges && order.node.lineItems.edges.map((product) => (
      <div className={s.orderItem} key={product.node.title}>
        <a href={`/product/${product.node.variant?.product.handle}`}>
        <img className={s.itemImage} src={product.node.variant?.product.images.edges[0].node.transformedSrc}/>
        <span className={s.variant}>{product.node.variant?.product.title}</span></a><span>: {product.node.quantity}x</span>
      </div>
    ))}
      </div>
  </div>
)

export default OrderCard
