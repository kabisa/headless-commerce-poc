import cn from 'classnames'
import type { SearchPropsType } from '@lib/search-props'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Container, Skeleton } from '@components/ui'
import s from './Search.module.css'
import { ChevronDown, ChevronUp } from "@components/icons";

import useSearch from '@framework/product/use-search'

import getSlug from '@lib/get-slug'
import rangeMap from '@lib/range-map'

const SORT: { [key: string]: string; } = {
  'trending-desc': 'Trending',
  'latest-desc': 'Latest arrivals',
  'price-asc': 'Price: Low to high',
  'price-desc': 'Price: High to low',
}

import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'

export default function Search({ categories, brands }: SearchPropsType) {
  const [activeFilter, setActiveFilter] = useState('')
  const [toggleFilter, setToggleFilter] = useState(false)

  const router = useRouter()
  const { asPath, locale } = router
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })

  const { pathname, category, brand } = useSearchMeta(asPath)
  const activeCategory = categories.find((cat) => cat.slug === category)
  const activeBrand = brands.find((b) => getSlug(b.node.path) === `brands/${brand}`)?.node

  const { data } = useSearch({
    search: typeof q === 'string' ? q : '',
    categoryId: activeCategory?.id,
    brandId: (activeBrand)?.entityId,
    sort: typeof sort === 'string' ? sort : '',
    locale,
  })

  const handleClick = (filter: string) => {
    if (filter !== activeFilter) {
      setToggleFilter(true)
    } else {
      setToggleFilter(!toggleFilter)
    }
    setActiveFilter(filter)
  }

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-20">
        <div className="col-span-8 lg:col-span-2 order-1 lg:order-none">
          <div className="top-[86px] static lg:sticky">
          {/* Categories */}
          <div className="relative inline-block w-full">
            <div className="lg:hidden">
              <span className="rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => handleClick('categories')}
                  className={s.sortButton}
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true">
                  {activeCategory?.name ? `Category: ${activeCategory?.name}` : 'All Categories'}
                  {activeFilter !== 'categories' || !toggleFilter ?  <ChevronDown width='20px' height='20px'/> : <ChevronUp width='20px' height='20px'/>}
                </button>
              </span>
            </div>
            <div
              className={cn(s.listContainer, activeFilter !== 'categories' || !toggleFilter ? 'hidden' : '')}>
              <div className="rounded-sm bg-accent-0 shadow-xs lg:bg-none lg:shadow-none">
                <div
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu">
                  <ul className={s.list}>
                    <li className={cn(s.listTitle, { underline: !activeCategory?.name, } )} >
                      <Link href={{ pathname: getCategoryPath('', brand), query }}>
                        <a className={s.listLink} onClick={() => handleClick('categories')}> All Categories</a>
                      </Link>
                    </li>
                    {categories.map((category) => (
                      <li key={category.path} className={cn(s.listItem, { underline: activeCategory?.id === category.id, } )}>
                        <Link href={{ pathname: getCategoryPath(category.path, brand), query,}}>
                          <a className={s.listLink} onClick={() => handleClick('categories')}>{category.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Designers */}
          <div className="relative inline-block w-full">
            <div className="lg:hidden mt-3">
              <span className="rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => handleClick('brands')}
                  className={s.sortButton}
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true">
                  {activeBrand?.name ? `Design: ${activeBrand?.name}` : 'All Designers'}
                  {activeFilter !== 'brands' || !toggleFilter ?  <ChevronDown width='20px' height='20px'/> : <ChevronUp width='20px' height='20px'/>}
                </button>
              </span>
            </div>
            <div
              className={cn(s.listContainer, activeFilter !== 'brands' || !toggleFilter ? 'hidden' : '')}>
              <div className="rounded-sm bg-accent-0 shadow-xs lg:bg-none lg:shadow-none">
                <div
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu">
                  <ul className={s.list}>
                    <li className={cn(s.listTitle, { underline: !activeBrand?.name, })}>
                      <Link href={{pathname: getDesignerPath('', category), query,}}>
                        <a className={s.listLink} onClick={() => handleClick('brands')}>All Designers</a>
                      </Link>
                    </li>
                    {brands.map((brand) => (
                      <li key={brand.node.path} className={cn(s.listItem, {underline: activeBrand?.entityId === brand.node.entityId,})}>
                        <Link href={{pathname: getDesignerPath(brand.node.path, category), query,}}>
                          <a className={s.listLink} onClick={() => handleClick( 'brands')}>{brand.node.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        {/* Products */}
        <div className="col-span-8 order-3 lg:order-none">
          {(q || activeCategory || activeBrand) && (
            <div className="mb-4 transition ease-in duration-75">
              {data ? (
                <>
                  <span className={cn('animated', {
                      fadeIn: data.found,
                      hidden: !data.found,
                    })}>Showing {data.products.length} results{' '}
                    {q && (<>for &quot;<strong>{q}</strong>&quot;</>)}
                  </span>
                  <span
                    className={cn('animated', { fadeIn: !data.found, hidden: data.found,})}>
                    {q ? (
                      <>There are no products that match &quot;<strong>{q}</strong>&quot;</>
                    ) : (
                      <>There are no products that match the selected category and/or designer.</>
                    )}
                  </span>
                </>
              ) : q ? (
                <>Searching for: &quot;<strong>{q}</strong>&quot;</>
              ) : (
                <>Searching...</>
              )}
            </div>
          )}
          {data ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.products.map((product: Product) => (
                <ProductCard
                  variant="simple"
                  key={product.path}
                  className="animated fadeIn"
                  product={product}
                  imgProps={{
                    width: 480,
                    height: 480,
                  }}/>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rangeMap(12, (i) => (
                <Skeleton key={i}>
                  <div className="w-60 h-60" />
                </Skeleton>
              ))}
            </div>
          )}{' '}
        </div>

        {/* Sort */}
        <div className="col-span-8 lg:col-span-2 order-2 lg:order-none">
          <div className="relative inline-block w-full">
            <div className="lg:hidden">
              <span className="rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => handleClick('sort')}
                  className={s.sortButton}
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true">
                  {sort ? `Sort: ${SORT[query.sort] || sort}` : 'Relevance'}
                  {activeFilter !== 'sort' || !toggleFilter ?  <ChevronDown width='20px' height='20px'/> : <ChevronUp width='20px' height='20px'/>}
                </button>
              </span>
            </div>
            <div
              className={cn(s.listContainer, activeFilter !== 'sort' || !toggleFilter ? 'hidden' : '')}>
              <div className="rounded-sm bg-accent-0 shadow-xs lg:bg-none lg:shadow-none">
                <div
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu">
                  <ul className={s.list}>
                    <li className={cn(s.listTitle, {underline: !sort,})}>
                      <Link href={{ pathname, query: filterQuery({ q }) }}>
                        <a className={s.listLink} onClick={() => handleClick('sort')}>Relevance</a>
                      </Link>
                    </li>
                    {Object.entries(SORT).map(([key, text]) => (
                      <li key={key} className={cn(s.listItem, { underline: sort === key, })}>
                        <Link
                          href={{pathname, query: filterQuery({ q, sort: key }),}}>
                          <a className={s.listLink} onClick={() => handleClick('sort')}>{text}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

Search.Layout = Layout
