import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import React, { FC, useEffect, useState } from 'react'
import s from './ProductView.module.css'
import type { Product } from '@commerce/types/product'
import usePrice, { formatVariantPrice } from '@framework/product/use-price'
import { ProductSlider, ProductCard, Swatch } from '@components/product'
import { Button, Collapse, Container, Rating, Text, useUI } from '@components/ui'
import { useCommerce } from "@commerce";
import ProductTag from '../ProductTag'
import { SelectedOptions, getProductVariant, selectDefaultOptionFromProduct } from "@components/product/helpers";
import { useAddItem } from '@framework/cart'


interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  const addItem = useAddItem()
  let { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [choices, setChoices] = useState<SelectedOptions>({})
  const [choice, setChoice] = useState<{optionName: string, optionValue: string}>(
    { optionName: product.variants[0].options[0].displayName,
      optionValue: product.variants[0].options[0].values[0].label })
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  product.variants.map(variant => {
    variant.options.map(option => {
      if (option.displayName.toLowerCase() == choice.optionName.toLowerCase()) {
        option.values.map(value => {
            if (value.label.toLowerCase() == choice.optionValue.toLowerCase()) {
              price = formatVariantPrice(
                {
                  amount: variant.price!,
                  baseAmount: product.price.retailPrice!,
                  currencyCode: product.price.currencyCode!,
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  locale: useCommerce().locale
                }).price
            }
          }
        )
      }
    })
  })

  useEffect(() => {
    // Selects the default option
    product.variants[0].options?.forEach((v) => {
      setChoices((choices) => ({
        ...choices,
        [v.displayName.toLowerCase()]: v.values[0].label.toLowerCase(),
      }))
    })
  }, [product.variants])

  const variant = getProductVariant(product, selectedOptions)

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0].id),
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <>
      <Container className="max-w-none w-full" clean>
        <div className={cn(s.root, 'fit')}>
          <div className={cn(s.main, 'fit')}>
            <ProductTag
              name={product.name}
              price={`${price} ${product.price?.currencyCode}`}
              fontSize={32}
            />
            <div className={s.sliderContainer}>
              <ProductSlider key={product.id}>
                {product.images.map((image, i) => (
                  <div key={image.url} className={s.imageContainer}>
                    <Image
                      className={s.img}
                      src={image.url}
                      alt={image.alt || 'Product Image'}
                      width={600}
                      height={600}
                      priority={i === 0}
                      quality="85"
                    />
                  </div>
                ))}
              </ProductSlider>
            </div>
          </div>

          <div className={s.sidebar}>
            <div>
              {product.options.map((opt) => (
                <div className="pb-4" key={opt.displayName}>
                  <h2 className="uppercase font-medium text-sm tracking-wide">
                    {opt.displayName}
                  </h2>
                  <div className="flex flex-row py-4 pl-1 overflow-auto">
                    {opt.values.map((v, i: number) => {
                      const active = selectedOptions[opt.displayName.toLowerCase()]
                      return (
                        <Swatch
                          key={`${opt.id}-${i}`}
                          active={v.label.toLowerCase() === active}
                          variant={opt.displayName}
                          color={v.hexColors ? v.hexColors[0] : ''}
                          label={v.label}
                          round={true}
                          onClick={() => {
                            setSelectedOptions((selectedOptions) => {
                              return {
                                ...selectedOptions,
                                [opt.displayName.toLowerCase()]:
                                  v.label.toLowerCase(),
                              }
                            })
                            setChoice({optionName: opt.displayName.toLowerCase(), optionValue: v.label.toLowerCase()})
                          }}
                        />
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            <Text
              className="pb-4 break-words w-full max-w-xl"
              html={product.descriptionHtml || product.description}
            />
            <div className="flex flex-row justify-between items-center">
              <Rating value={4} />
              <div className="text-accent-6 pr-1 font-medium text-sm">36 reviews</div>
            </div>
            <div>
              {process.env.COMMERCE_CART_ENABLED && (
                <Button
                  aria-label="Add to Cart"
                  type="button"
                  className={s.button}
                  onClick={addToCart}
                  loading={loading}
                  disabled={variant?.availableForSale === false}
                >
                  { variant?.availableForSale === false ? 'Not Available' : 'Add To Cart' }
                </Button>
              )}
            </div>
            <div className="mt-6">
              <Collapse title="Care">
                This is a limited edition production run. Printing starts when the
                drop ends.
              </Collapse>
              <Collapse title="Details">
                This is a limited edition production run. Printing starts when the
                drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
                to COVID-19.
              </Collapse>
            </div>
          </div>

        </div>
        <hr className="mt-7 border-accent-2" />
        <section className="py-12 px-6 mb-10">
          <Text variant="sectionHeading">Related Products</Text>
          <div className={s.relatedProductsGrid}>
            {relatedProducts.map((p) => (
                <ProductCard
                  noNameTag
                  product={p}
                  key={p.id}
                  variant="simple"
                  className="animated fadeIn"
                  imgProps={{
                    width: 300,
                    height: 300,
                  }}
                />
            ))}
          </div>
        </section>
      </Container>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
    </>
  )
}

export default ProductView
