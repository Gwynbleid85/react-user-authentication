export const authConfig = {
  authority: "https://lifeliqe-onewyz.zitadel.cloud", //Replace with your issuer URL
  client_id: "281137557000017451", //Replace with your client id
  redirect_uri: "http://localhost:3000/callback",
  response_type: "code",
  scope: "openid profile urn:zitadel:iam:user:resourceowner",
  post_logout_redirect_uri: "http://localhost:3000",
  userinfo_endpoint: "https://lifeliqe-onewyz.zitadel.cloud/oidc/v1/userinfo", //Replace with your user-info endpoint
  response_mode: "query",
  code_challenge_method: "S256",
};
