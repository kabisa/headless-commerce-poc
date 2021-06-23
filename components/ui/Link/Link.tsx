import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import React from 'react'

const Link: React.FC<NextLinkProps> = ({ href, children, ...props }) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  )
}

export default Link
