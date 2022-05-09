import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <Container>
        <div>
          <Apple src="https://res.cloudinary.com/dp8wexag9/image/upload/v1650220465/128x128_mpzcat.png" />
        </div>
        <div>
          <Title>
            <CopyRight src="https://res.cloudinary.com/dp8wexag9/image/upload/v1650220845/copyright_ciwtop.png" />
            Digital Press
          </Title>

          <RandomLinks>Privacy</RandomLinks>
          <RandomLinks>Terms</RandomLinks>
          <RandomLinks>Collection Notice</RandomLinks>
          <RandomLinks>Sitemap</RandomLinks>
        </div>
      </Container>
    </>
  );
};
const Apple = styled.img`
  margin-left: 20px;
`;
const Container = styled.div`
  padding: 5px;
  margin-top: 30px;
  border-top: 1px solid grey;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CopyRight = styled.img`
  height: 15px;
`;
const Title = styled.span`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;
const RandomLinks = styled.span`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  text-decoration: underline;
  margin-left: 10px;
  margin-right: 20px;
`;
export default Footer;
