export const authConfig = {
  authority: "https://lifeliqe-27azj8.zitadel.cloud", //Replace with your issuer URL
  client_id: "271577186778059711@lifeliqe", //Replace with your client id
  redirect_uri: "http://localhost:3000/callback",
  response_type: "code",
  scope: "openid profile email",
  post_logout_redirect_uri: "http://localhost:3000",
  userinfo_endpoint: "https://lifeliqe-27azj8.zitadel.cloud/oidc/v1/userinfo", //Replace with your user-info endpoint
  response_mode: "query",
  code_challenge_method: "S256",
};
