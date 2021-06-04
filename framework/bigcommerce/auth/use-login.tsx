import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useLogin, { UseLogin } from '@commerce/auth/use-login'
import type { LoginHook } from '../types/login'
import useCustomer from '../customer/use-customer'

export default useLogin 

export const handler: MutationHook<LoginHook> = {
  fetchOptions: {
    url: '/api/login',
    method: 'POST',
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message:
          'A first name, last name, email and password are required to login',
      })
    }

    return fetch({
      ...options,
      body: { email, password },
    })
  },
  useHook: ({ fetch }) => () => {
    const { revalidate } = useCustomer()

    return useCallback(
      async function login(input) {
        const data = await fetch({ input })
        await revalidate()
        return data
      },
      [fetch, revalidate]
    )
  },
}
