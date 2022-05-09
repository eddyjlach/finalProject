import React from "react";
import DropDown from "./DropDown";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";

const Read = () => {
  const [stories, setStories] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("/get-story")
      .then((res) => res.json())
      .then((data) => {
        setStories(data.data);

        console.log(data.data);
      });
  }, []);

  return (
    <>
      <DropDown />
      <TitlePage>Read</TitlePage>
      <MainWrapper>
        {stories &&
          stories.map((story) => {
            return (
              <Wrapper>
                <Divider>
                  <StyledLink to={`/full-text/${story._id}`}>
                    <Title>{story.title}</Title>
                  </StyledLink>
                  <StyledLink to={`/users-profile/${story.username}`}>
                    <Author>{story.username}</Author>
                  </StyledLink>
                  <Genre>{story.genre}</Genre>
                  <Synopsis>{story.synopsis}</Synopsis>
                </Divider>
              </Wrapper>
            );
          })}
      </MainWrapper>
      <Footer />
    </>
  );
};
const StyledLink = styled(Link)`
  text-decoration: none;
`;
const MainWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;
const TitlePage = styled.h1`
  margin-left: 80px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;
const Divider = styled.div`
  margin-top: 50px;
  border: 2px solid grey;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 20px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.4s ease;
  &:hover {
    border-radius: 0% 0% 50% 50% / 0% 0% 5% 5%;
    box-shadow: 10px 10px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }
`;
const Title = styled.h1`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: black;
  line-height: 30px; ;
`;
const Author = styled.p`
  text-decoration: none;
  color: black;
`;
const Synopsis = styled.p`
  font-style: italic;
`;
const Genre = styled.h2`
  font-size: 20px;
  font-weight: normal;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;
const Wrapper = styled.div`
  display: flex;
  max-width: 20vw;

  margin-left: 80px;
  line-height: 20px;
`;
export default Read;
