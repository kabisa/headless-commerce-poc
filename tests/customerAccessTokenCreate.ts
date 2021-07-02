import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import customerAccessTokenCreateMutation from "../framework/shopify/utils/mutations/customer-access-token-create";
import doFetch from "./doFetch";
import {CustomerAccessToken} from "@framework/schema";
import customerAccessTokenCreateData from "../cypress/fixtures/customerAccessTokenCreateData.json";

export const customerAccessTokenCreate = async (): Promise<string> => {

  fetchMock.mockResponseOnce(JSON.stringify(customerAccessTokenCreateData))

  const tokenBody = {
    variables: { input: { email: "janwillemvanbremen@live.nl", password: "JanWillem123" }},
    query: customerAccessTokenCreateMutation
  };

  const tokenResponse = await doFetch('post', tokenBody);

  const tokenData = await tokenResponse.json();

  console.log(tokenData);

  const customerAccessToken: CustomerAccessToken = tokenData.data.customerAccessTokenCreate.customerAccessToken

  return customerAccessToken.accessToken
}
