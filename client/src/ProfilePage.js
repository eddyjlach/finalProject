import React from "react";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import Footer from "./Footer";
import DropDown from "./DropDown";
import { useState } from "react";
import { Link } from "react-router-dom";

// in here we are trying to see if user has entered a user name/bio. If they did not, they weill be redirected to a sign in page. if they are
//

const ProfilePage = () => {
  const [reading, setReading] = useState(null);
  const [readers, setReaders] = useState(null);
  const { userData, setUserData } = useContext(CurrentUserContext);
  const [stories, setStories] = useState(null);
  const userStories = userData.username;
  console.log(userData);
  useEffect(() => {
    fetch(`/get-users-stories/${userStories}`)
      .then((res) => res.json())
      .then((data) => {
        // one for the story
        setStories(data.data);
        //one for the Title
        console.log(data.data);
      });
  }, []);
  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        readings: userData.reading,
        readers: userData.readers,
      }),
    };
    fetch("/get-users", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setReading(data.data.foundReadings);
        setReaders(data.data.foundReaders);
        console.log(data);
      });
  }, [userData]);

  // const { currentUser, setCurrentUser, userData, setUserData } =
  //   useContext(CurrentUserContext);
  //   if (userData && (!userData.username || !userData.bio)) {
  //     return;
  //   }

  return (
    <>
      <DropDown />
      <MainWrapper>
        <Title>Profile</Title>

        <UpperWrapper>
          <ImgCont>
            <Img src={userData.picture} />
          </ImgCont>
          <UserInfoCont>
            <UserInfo>{userData.username}</UserInfo>
            <UserInfo>{userData.email}</UserInfo>
          </UserInfoCont>
        </UpperWrapper>

        <MidContainer>
          <MidTitle>Bio</MidTitle>
          <Bio>{userData.bio}</Bio>
        </MidContainer>

        <MidTitle>Community</MidTitle>
        <FollowContainer>
          <Readers>
            <Community>Reading</Community>
            {reading &&
              reading.map((friend) => {
                return <img src={friend.picture} />;
              })}
          </Readers>
          <Reading>
            <Community>Readers</Community>
            {readers &&
              readers.map((friend) => {
                return <img src={friend.picture} />;
              })}
          </Reading>
        </FollowContainer>

        <EndTitle>My Stories</EndTitle>

        <Stories>
          {stories &&
            stories.map((story) => {
              return (
                <>
                  <Wrapper>
                    <Divider>
                      <StyledLink to={`/full-text/${story._id}`}>
                        <StoryTitle>{story.title}</StoryTitle>
                      </StyledLink>
                      <Genre>Genre:{story.genre}</Genre>
                      <Synopsis>Synopsis:{story.synopsis}</Synopsis>
                    </Divider>
                  </Wrapper>
                </>
              );
            })}
        </Stories>
      </MainWrapper>
      <Footer />
    </>
  );
};
const StyledLink = styled(Link)`
  text-decoration: none;
`;
const Wrapper = styled.div`
  display: flex;
  max-width: 20vw;

  margin-left: 80px;
  line-height: 20px;
`;
const UpperWrapper = styled.div`
  display: flex;
`;
const ImgCont = styled.div``;
const UserInfoCont = styled.div``;
const UserInfo = styled.h1`
  font-weight: normal;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin-left: 10px;
  align-items: baseline;
  font-size: 15px;
`;
const Img = styled.img`
  border-radius: 50px; ;
`;
const Title = styled.h1``;
const MidTitle = styled.h1`
  font-size: 25px;
`;
const StoryTitle = styled.h1`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: black;
  line-height: 30px; ;
`;
const Genre = styled.h2`
  font-size: 20px;
  font-weight: normal;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;

const Synopsis = styled.p`
  font-style: italic;
`;
const Readers = styled.div`
  margin-right: 50%;
`;
const Reading = styled.div``;
const Stories = styled.div``;
const EndTitle = styled.h1`
  font-size: 25px;
  display: flex;
  justify-content: center;
`;
const StoryContainer = styled.div`
  line-height: 10px;
`;
const Community = styled.h1`
  font-size: 20px;
  font-weight: normal;
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
const MainWrapper = styled.div`
  margin-left: 100px;
`;
const Bio = styled.h1`
  font-size: 15px;
  font-weight: normal;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;
const MidContainer = styled.div``;
const FollowContainer = styled.div`
  display: flex;
  margin: left;
`;

export default ProfilePage;
