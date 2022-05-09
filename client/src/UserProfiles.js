import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DropDown from "./DropDown";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
const UserProfiles = () => {
  const [button, setButton] = useState(false);
  const [update, setUpdate] = useState(false);
  const { currentuser, setCurrentuser, userData, setUserData } =
    useContext(CurrentUserContext);
  const [reading, setReading] = useState(null);
  const [readers, setReaders] = useState(null);
  const [user, setUser] = useState(null);
  const [stories, setStories] = useState(null);
  const { username } = useParams();
  //getting users friends
  useEffect(() => {
    fetch(`/user/${username}`)
      .then((res) => res.json())
      .then((data) => {
        // one for the story
        setUser(data.data);
        //one for the Title
        console.log(data.data);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            readings: data.data.reading,
            readers: data.data.readers,
          }),
        };
        // const requestReaders = {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     readers: data.data.readers,
        //   }),
        // };
        fetch("/get-users", requestOptions)
          .then((res) => res.json())
          .then((data) => {
            setReading(data.data.foundReadings);
            setReaders(data.data.foundReaders);
            console.log(data);
          });
        // fetch("/get-users", requestReaders)
        //   .then((res) => res.json())
        //   .then((data) => {
        //     setReaders(data.data);
        //     console.log(data.data);
        //   });
      });
  }, [userData, update]);
  // console.log(_id);
  useEffect(() => {
    fetch(`/get-users-stories/${username}`)
      .then((res) => res.json())
      .then((data) => {
        // one for the story
        setStories(data.data);
        //one for the Title
        console.log(data.data);
      });
  }, [userData]);
  const addFriends = (event) => {
    setButton(true);
    event.preventDefault();
    const requestFriend = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userData.username,
      }),
    };
    fetch(`/add-friend/${username}`, requestFriend)
      .then((res) => res.json())
      .then((data) => {
        setUpdate(!update);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <DropDown />
      <MainWrapper>
        {user && (
          <>
            <Title>Profile</Title>
            <UpperWrapper>
              <ImgCont>
                <Img src={user.picture} />
              </ImgCont>
              <UserInfoCont>
                <UserInfo>{user.username}</UserInfo>
                <UserInfo>{user.email}</UserInfo>
              </UserInfoCont>
            </UpperWrapper>

            <MidContainer>
              <MidTitle>Bio</MidTitle>
              <Bio>{user.bio}</Bio>
            </MidContainer>
            {console.log(
              userData &&
                !userData.reading.includes(user.username) &&
                user.username !== userData.username
            )}

            {userData &&
              !user.readers.includes(userData.username) &&
              !userData.reading.includes(user.username) &&
              user.username !== userData.username && (
                <button onClick={addFriends} disabled={button}>
                  add this user to your reading list
                </button>
              )}

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
                    <Wrapper>
                      <Divider>
                        <StyledLink to={`/full-text/${story._id}`}>
                          <Title>{story.title}</Title>
                        </StyledLink>
                        <Genre>{story.genre}</Genre>
                        <Synopsis>{story.synopsis}</Synopsis>
                      </Divider>
                    </Wrapper>
                  );
                })}
            </Stories>
          </>
        )}
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
const Stories = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
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

const StoryContainer = styled.div`
  line-height: 10px;
`;

const EndTitle = styled.h1`
  font-size: 25px;
  display: flex;
  justify-content: center;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;
const Span = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  margin-right: 10px;
`;
const MidContainer = styled.div``;
const Bio = styled.h1`
  font-size: 15px;
  font-weight: normal;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;
const Community = styled.h1`
  font-size: 20px;
  font-weight: normal;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;
const MidTitle = styled.h1`
  font-size: 25px;
`;
const Readers = styled.div`
  margin-right: 50%;
`;
const Reading = styled.div``;
const FollowContainer = styled.div`
  display: flex;
  margin: left;
`;
const MainWrapper = styled.div`
  margin-left: 100px;
`;
const Img = styled.img`
  border-radius: 50px; ;
`;

const ImgCont = styled.div``;
const UserInfoCont = styled.div``;
const UpperWrapper = styled.div`
  display: flex;
`;
const UserInfo = styled.h1`
  font-weight: normal;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin-left: 10px;
  align-items: baseline;
  font-size: 15px;
`;

export default UserProfiles;
