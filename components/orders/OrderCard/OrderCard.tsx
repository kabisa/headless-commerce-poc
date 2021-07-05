import React, { FC } from 'react'
import { OrderEdge } from "@framework/schema";
import s from './OrderCard.module.css'
import { capitalize } from "@lib/capitalize";
import { displayAmount } from "@lib/displayAmount";
import Image from "next/image";

interface Props {
  order: OrderEdge
}

const placeholderImg = "/product-img-placeholder.svg"

const OrderCard: FC<Props> = ({order}) => {

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    const scrolledToBottom = target.scrollTop === (target.scrollHeight - target.offsetHeight)
    const scrolledToTop = target.scrollTop === 0

    scrolledToBottom ? target.classList.add(s.atBottom) : target.classList.remove(s.atBottom)
    scrolledToTop ? target.classList.add(s.atTop) : target.classList.remove(s.atTop)
  };

  return (
  <div className={s.orderCard}>
    <h1 className={s.orderName}>Order: {order.node.name}</h1>
    <p className={s.orderSubTotal}>Subtotal: {displayAmount(order.node.subtotalPriceV2?.amount)} {order.node.subtotalPriceV2?.currencyCode}</p>
    <p className={s.orderShipping}>Shipping: { order.node.totalShippingPriceV2.amount !== "0.0" ? ( `${displayAmount(order.node.totalShippingPriceV2.amount)} ${order.node.totalShippingPriceV2.currencyCode}` ) : <span className={s.freeShipping}>Free</span> }</p>
    <hr className={s.ruler}/>
    <p className={s.orderTotal}>Total: {displayAmount(order.node.totalPriceV2.amount)} {order.node.totalPriceV2.currencyCode}</p>
    <p className={s.orderStatus}>Status: <span
      className={order.node.fulfillmentStatus.toLowerCase() == 'fulfilled' ? s.fulfilled : ''}>{capitalize(order.node.fulfillmentStatus)}</span>
    </p>
    <p className={s.orderDate}>{new Date(Date.parse(order.node.processedAt)).toDateString()}</p>
    <br/>
    <p className={s.orderProducts}>You bought:</p>
    <div className={`${s.orderItems} ${s.atTop} ${order.node.lineItems.edges.length < 4 ? s.atBottom : ''}`} onScroll={handleScroll}>
      <section className={s.fadein}/>
      {order.node.lineItems.edges && order.node.lineItems.edges.map((product) => (
        <div className={s.orderItem} key={product.node.variant?.id}>
          <a href={`/product/${product.node.variant?.product.handle || ''}`}>
            <img className={s.itemImage} src={product.node.variant?.product.images.edges[0].node.transformedSrc || placeholderImg} alt={product.node.variant?.product.images.edges[0].node.altText || 'Product image'}/>
            <span className={s.variant}>{product.node.variant?.product.title}</span>
          </a>
          <span className={s.amount}>: {product.node.quantity}x {displayAmount(product.node.variant?.priceV2.amount)} {product.node.variant?.priceV2.currencyCode}</span>
        </div>
      ))}
      <section className={s.fadeout}/>
    </div>
  </div>
  )
}

export default OrderCard
