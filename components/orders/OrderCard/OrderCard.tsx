import React, { FC } from 'react'
import { OrderEdge } from "@framework/schema";
import s from './OrderCard.module.css'
import { capitalize } from "@lib/capitalize";

interface Props {
  order: OrderEdge
}

const OrderCard: FC<Props> = ({
  order,
  ...props
}) => {

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const target = event.target! as HTMLElement
    const scrolled = target.scrollTop === (target.scrollHeight - target.offsetHeight)

    scrolled ? target.classList.add(s.atBottom) : target.classList.remove(s.atBottom);
  };

  return (
  <div className={s.orderCard}>
    <h1 className={s.orderName}>Order: {order.node.name}</h1>
    <p className={s.orderTotal}>Total: {order.node.totalPriceV2.amount} {order.node.totalPriceV2.currencyCode}</p>
    <p className={s.orderStatus}>Status: <span
      className={order.node.fulfillmentStatus.toLowerCase() == 'fulfilled' ? s.fulfilled : ''}>{capitalize(order.node.fulfillmentStatus)}</span>
    </p>
    <p className={s.orderDate}>{new Date(Date.parse(order.node.processedAt)).toDateString()}</p>
    <br/>
    <p className={s.orderProducts}>Items:</p>
    <div className={s.orderItems} onScroll={handleScroll}>
      {order.node.lineItems.edges && order.node.lineItems.edges.map((product) => (
        <div className={s.orderItem} key={product.node.variant?.id}>
          <a href={`/product/${product.node.variant?.product.handle}`}>
            <img className={s.itemImage} src={product.node.variant?.product.images.edges[0].node.transformedSrc}/>
            <span className={s.variant}>{product.node.variant?.product.title}</span></a><span
          className={s.amount}>: {product.node.quantity}x</span>
        </div>
      ))}
      {order.node.lineItems.edges.length > 3 && <div className={s.fadeout}/>}
    </div>
  </div>
  )
}

export default OrderCard
