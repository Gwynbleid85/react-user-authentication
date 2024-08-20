import React, { useEffect, useState } from "react";
import { authConfig } from "../authConfig";
import { redirect } from "react-router-dom";

const Callback = ({
  auth,
  setAuth,
  userManager,
  userInfo,
  setUserInfo,
  handleLogout,
}) => {
  const [accessToken, setAccessToken] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (auth === null) {
      userManager
        .signinRedirectCallback()
        .then((user) => {
          if (user) {
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
                setUserInfo(userInfo);
                console.log(userInfo);
              });
          } else {
            setAuth(false);
            console.log("user not in response");
          }
        })
        .catch((error) => {
          setAuth(false);
          localStorage.clear();
          window.location.replace(authConfig.post_logout_redirect_uri);
          console.log("Login failed");
        });
    }
  }, [auth, userManager, setAuth]);

  const testAuthJWT = () => {
    setInfo("Loading...");
    fetch("http://localhost:5019/test/authorize/jwt", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setInfo("JWT authorization sucessfull!");
        } else {
          setInfo("JWT authorization FAILED!");
        }
      })
      .catch((error) => {
        setInfo("JWT authorization FAILED!");
      });
  };

  const copyTokenToClipboard = () => {
    navigator.clipboard.writeText(accessToken);
    setInfo("Text coppied to clipboard!");
  };

  if (auth === true && userInfo) {
    return (
      <div className="main_wrapper">
        <div className="main_tile">
          <h1>Welcome, {userInfo.name}!</h1>
          <span>Click to copy access token!</span>
          <div
            className="access_token_container"
            onClick={copyTokenToClipboard}
          >
            <pre>{accessToken}</pre>
          </div>
          <h4>{info}</h4>
          <button className="mainButton" onClick={handleLogout}>
            Log out
          </button>
          <button
            className="mainButton"
            onClick={() => {
              testAuthJWT();
            }}
          >
            Test auth JWT
          </button>
          <br />
          <div className="debug_tile">
            <b> Bebug info: </b>
            <pre>{JSON.stringify(userInfo, null, 2)}</pre>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading... {auth}</div>;
  }
};

export default Callback;
