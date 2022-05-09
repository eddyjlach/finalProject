import React from "react";
import Form from "./Form";
import styled from "styled-components";
import Footer from "./Footer";

//when a suer wants to write it goes to thew user signup page. if they have not done so.
const WriterSignup = () => {
  return (
    <Container
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dp8wexag9/image/upload/v1649272012/retro-typewriter-logo-business-corporate-identity-illustration_53876-114657_iwaxdf.webp`,
      }}
    >
      <Title>Fill this form to continue</Title>
      <Form />
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;
const Title = styled.h1`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;
export default WriterSignup;
