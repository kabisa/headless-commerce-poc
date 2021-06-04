import React, { FC, useRef } from 'react'
import { useUserAvatar } from '@lib/hooks/useUserAvatar'

interface Props {
  className?: string
  children?: any
}

const Avatar: FC<Props> = ({}) => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>
  const { userAvatar } = useUserAvatar()

  return (
    <div
      ref={ref}
      style={{ backgroundImage: userAvatar }}
      className="inline-block h-8 w-8 rounded-full border-2 border-primary hover:border-secondary focus:border-secondary transition linear-out duration-150"
    >
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  )
}

export default Avatar
