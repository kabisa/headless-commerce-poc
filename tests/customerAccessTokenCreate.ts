import customerAccessTokenCreateMutation from "../framework/shopify/utils/mutations/customer-access-token-create";
import doFetch from "./doFetch";

export const customerAccessTokenCreate = async () => {

  const tokenBody = {
    variables: {input: {email: "janwillemvanbremen@live.nl", password: "Tjukeprie12@2TF"}},
    query: customerAccessTokenCreateMutation
  };

  const tokenResponse = await doFetch('post', tokenBody);

  const tokenData = await tokenResponse.json();

  const customerAccessToken = tokenData.data.customerAccessTokenCreate.customerAccessToken.accessToken

  return customerAccessToken
}
