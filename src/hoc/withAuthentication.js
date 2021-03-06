/**
 * Authentication
 *
 * wrap component for authentication
 */
import React, { useState, useEffect } from "react";
import { getAuthUserTokens, login } from "@topcoder/micro-frontends-navbar-app";
import LoadingIndicator from "../components/LoadingIndicator";

export default function withAuthentication(Component) {
  const AuthenticatedComponent = (props) => {
    let [isLoggedIn, setIsLoggedIn] = useState(null);
    let [authError, setAuthError] = useState(false);

    useEffect(() => {
      // prevent page redirecting to login page when unmount
      let isUnmount = false;
      getAuthUserTokens()
        .then(({ tokenV3 }) => {
          if (!!tokenV3) {
            setIsLoggedIn(!!tokenV3);
          } else if (!isUnmount) {
            login();
          }
        })
        .catch(setAuthError);
      return () => {
        isUnmount = true;
      };
    }, []);

    return (
      <>
        {/* Show loading indicator until we know if user is logged-in or no.
            In we got error during this process, show error */}
        {isLoggedIn === null && <LoadingIndicator error={authError} />}

        {/* Show component only if user is logged-in */}
        {isLoggedIn === true ? <Component {...props} /> : null}
      </>
    );
  };

  return AuthenticatedComponent;
}
