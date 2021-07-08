import { FC } from 'react'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import { Grid } from '@components/ui'
import { ProductCard } from '@components/product'
import s from './HomeAllProductsGrid.module.css'
import { getCategoryPath, getDesignerPath } from '@lib/search'

interface Props {
  categories?: any
  brands?: any
  products?: Product[]
}

const HomeAllProductsGrid: FC<Props> = ({
  categories,
  brands,
  products = [],
}) => {
  return (
    <div className={s.root}>
      <div className={s.asideWrapper}>
        <div className={s.aside}>
          <ul className="mb-10">
            <li className={s.listTitle}>
              <Link href={getCategoryPath('')}>
                <a className={s.listLink}>All Categories</a>
              </Link>
            </li>
            {categories.map((cat: any) => (
              <li key={cat.path} className={s.listItem}>
                <Link href={getCategoryPath(cat.path)}>
                  <a className={s.listLink}>{cat.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            <li className={s.listTitle}>
              <Link href={getDesignerPath('')}>
                <a className={s.listLink}>All Designers</a>
              </Link>
            </li>
            {brands.flatMap(({ node }: any) => (
              <li key={node.path} className={s.listItem}>
                <Link href={getDesignerPath(node.path)}>
                  <a className={s.listLink}>{node.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <Grid layout="normal">
          {products.map((product) => (
            <ProductCard
              key={product.path}
              product={product}
              variant="simple"
              className={"animated fadeIn"}
              imgProps={{
                width: 480,
                height: 480,
              }}
            />
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default HomeAllProductsGrid
