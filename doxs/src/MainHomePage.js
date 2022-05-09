import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LoggedInHomepage from "./LoggedInHomepage";
import NotLoggedInHomePage from "./NotLoggedInHomePage";

const MainHomePage = () => {
  const { isLoading, isAuthenticated, error, user, logout, loginWithRedirect } =
    useAuth0();

  return (
    <>{isAuthenticated ? <LoggedInHomepage /> : <NotLoggedInHomePage />}</>
  );
};

export default MainHomePage;
