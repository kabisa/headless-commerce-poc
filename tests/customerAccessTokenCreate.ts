import customerAccessTokenCreateMutation from "../framework/shopify/utils/mutations/customer-access-token-create";
import doFetch from "./doFetch";
import {CustomerAccessToken} from "@framework/schema";

export const customerAccessTokenCreate = async (): Promise<string> => {

  const tokenBody = {
    variables: { input: { email: "janwillemvanbremen@live.nl", password: "JanWillem123" }},
    query: customerAccessTokenCreateMutation
  };

  const tokenResponse = await doFetch('post', tokenBody);

  const tokenData = await tokenResponse.json();

  const customerAccessToken: CustomerAccessToken = tokenData.data.customerAccessTokenCreate.customerAccessToken

  return customerAccessToken.accessToken
}
