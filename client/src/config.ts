// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'pmdhco7iei'
export const apiEndpoint = `https://${apiId}.execute-api.us-west-2.amazonaws.com/dev`
export const originUrl = `http://localhost:3000/`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-n68--8mq.us.auth0.com',
  clientId: 'B4aF3N1605NyW8xUFmcHtLxDGbe2l9E2',
  callbackUrl: 'http://localhost:3000/callback'
}
