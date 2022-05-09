import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import ocean from "./images.svg/ocean.jpg";
const NotLoggedInHomePage = () => {
  const { isLoading, isAuthenticated, error, user, logout, loginWithRedirect } =
    useAuth0();
  return (
    <>
      <Wrapper
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dp8wexag9/image/upload/v1649272012/retro-typewriter-logo-business-corporate-identity-illustration_53876-114657_iwaxdf.webp`,
        }}
      >
        <Container>
          <Title>Welcome to Digital Press</Title>
          <LogInButton onClick={() => loginWithRedirect()}>Log In</LogInButton>
        </Container>
      </Wrapper>
    </>
  );
};
const Container = styled.div``;
const Title = styled.h1`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: black;
`;
const LogInButton = styled.button`
  margin-left: 100px;
  color: #6699cc;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  background-color: white;
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(rgba(lightblue, 0.4), rgba(plum, 0.4));
  font-family: Futura, "Helvetica Neue", Helvetica, sans-serif;
  color: black;
  border: none;
  padding: 20px 60px;
  &:hover {
    cursor: pointer;
    transform: rotateX(0deg);
    background-color: #f0fff0;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
`;
export default NotLoggedInHomePage;
