import { VFC } from 'react'
import { Logo, Input } from '@components/ui'

const LogoutView: VFC = () => {
  return (
    <div
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-3">
          <span className="text-center text-xl">Successfully logged out!</span>
        <Input type="email" placeholder="Email" className="h-0 opacity-0"/>
      </div>
    </div>
  )
}

export default LogoutView
