import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import DropDown from "./DropDown";

const LoggedInHomepage = () => {
  const { isLoading, isAuthenticated, error, user, logout, loginWithRedirect } =
    useAuth0();
  return (
    <>
      <DropDown />
      <Wrapper
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dp8wexag9/image/upload/v1649272012/retro-typewriter-logo-business-corporate-identity-illustration_53876-114657_iwaxdf.webp`,
        }}
      >
        <UpperContainer>
          <Title>Welcome to Digital Press</Title>
          <div>
            <Text>
              We are a publisher who wants to innovate stories for the 21st
              century
            </Text>
          </div>
        </UpperContainer>
      </Wrapper>
    </>
  );
};
const Title = styled.h1`
  margin-left: 40px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: black;
`;
const Text = styled.span``;
const LogOutButton = styled.button`
  color: #6699cc;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  background-color: #c594c5;
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(rgba(lightblue, 0.4), rgba(plum, 0.4));
  font-family: Futura, "Helvetica Neue", Helvetica, sans-serif;
  color: white;
  border: 5px solid white;
  padding: 20px 60px;
  &:hover {
    cursor: pointer;
    transform: rotateX(0deg);
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;

  background-size: cover;
  height: 100vh;
  width: 100vw;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6699cc;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  background-color: #c594c5;
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(rgba(lightblue, 0.4), rgba(plum, 0.4));
  font-family: Futura, "Helvetica Neue", Helvetica, sans-serif;
  color: white;
  border: 5px solid white;
  padding: 20px 60px;
  &:hover {
    background-color: #c594ad;
  }
`;
const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  margin: 0 auto;
`;
const UpperContainer = styled.div`
  margin: 0 auto;
  justify-content: center;
`;
export default LoggedInHomepage;
