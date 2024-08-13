export const authConfig = {
  authority: "http://localhost:8080", //Replace with your issuer URL
  client_id: "279126805145780227@lifeliqe", //Replace with your client id
  redirect_uri: "http://localhost:3000/callback",
  response_type: "code",
  scope: "openid profile urn:zitadel:iam:user:resourceowner",
  post_logout_redirect_uri: "http://localhost:3000",
  userinfo_endpoint: "http://localhost:8080/oidc/v1/userinfo", //Replace with your user-info endpoint
  response_mode: "query",
  code_challenge_method: "S256",
};
