import React, { useEffect, useState } from "react";
import { authConfig } from "../authConfig";

const Callback = ({
  auth,
  setAuth,
  userManager,
  userInfo,
  setUserInfo,
  handleLogout,
}) => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (auth === null) {
      userManager
        .signinRedirectCallback()
        .then((user) => {
          if (user) {
            console.log(user);
            setAccessToken(user.access_token);
            setAuth(true);
            const access_token = user.access_token;
            // Make a request to the user info endpoint using the access token
            fetch(authConfig.userinfo_endpoint, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            })
              .then((response) => response.json())
              .then((userInfo) => {
                console.log(userInfo);
                setUserInfo(userInfo);
              });
          } else {
            setAuth(false);
          }
        })
        .catch((error) => {
          setAuth(false);
        });
    }
  }, [auth, userManager, setAuth]);

  const [authorized, setAuthorized] = useState("");
  const [authorizedJWT, setAuthorizedJWT] = useState("");

  const testAuth = () => {
    setAuthorized("Loading...");
    fetch("http://localhost:5019/test/authorize", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setAuthorized("YES");
        } else {
          setAuthorized("NO");
        }
      })
      .catch((error) => {
        console.log(error);
        setAuthorized("NO");
      });
  };
  const testAuthJWT = () => {
    setAuthorizedJWT("Loading...");
    fetch("http://localhost:5019/test/authorize/jwt", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setAuthorizedJWT("YES");
        } else {
          setAuthorizedJWT("NO");
        }
      })
      .catch((error) => {
        console.log(error);
        setAuthorizedJWT("NO");
      });
  };

  if (auth === true && userInfo) {
    return (
      <div>
        <h1>Welcome, {userInfo.name}!</h1>
        <h2>Your ZITADEL Profile Information</h2>
        <h3>Name: {userInfo.name}</h3>
        <h3>Email: {userInfo.email}</h3>
        <h3>Email Verified: {userInfo.email_verified ? "Yes" : "No"}</h3>
        <h3>Locale: {userInfo.locale}</h3>
        <h2>Authorized basic: {authorized}</h2>
        <h2>Authorized JWT: {authorizedJWT}</h2>
        <h3>Scopes: {authConfig.scope}</h3>

        <button onClick={handleLogout}>Log out</button>
        <button
          onClick={() => {
            testAuth();
          }}
        >
          Test auth basic
        </button>

        <button
          onClick={() => {
            testAuthJWT();
          }}
        >
          Test auth JWT
        </button>
      </div>
    );
  } else {
    return <div>Loading... {auth}</div>;
  }
};

export default Callback;
