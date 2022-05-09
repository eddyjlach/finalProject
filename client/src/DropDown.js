import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { AiOutlineRead } from "react-icons/ai";
import { SiWritedotas } from "react-icons/si";
import { useHistory } from "react-router-dom";
// AiFillHome
// CgProfile
//AiOutlineRead
//SiWritedotas

const DropDown = () => {
  let history = useHistory();
  const { isLoading, isAuthenticated, error, user, logout, loginWithRedirect } =
    useAuth0();
  const { userData } = useContext(CurrentUserContext);
  const conditionalLinks = (ev) => {
    console.log(ev.target.value);
    if (ev.target.value === "Home") {
      history.push("/");
    } else if (ev.target.value === "Profile") {
      history.push("/profile-page");
    } else if (ev.target.value === "Write") {
      history.push("/writing");
    } else if (ev.target.value === "Read") {
      history.push("/read");
    } else if (ev.target.value === "logout") {
      logout();
    }
    console.log(userData);
  };

  return (
    userData && (
      <>
        <Wrapper>
          <div>
            <Title>Digital Press</Title>
          </div>
          <div>
            <Img src="https://res.cloudinary.com/dp8wexag9/image/upload/v1650226883/16bff2b8a9bd846610c518e6e2409fc3_g16qvv.jpg" />
          </div>
          <DashContainer>
            <div>
              <UserImg src={userData.picture} />
            </div>
            <div>
              <Dropdown
                simple={true}
                text="dropdown"
                onChange={conditionalLinks}
              >
                <Option>Dashboard</Option>
                <Option value="Home">
                  <AiFillHome />
                  Home
                </Option>
                <Option value="Profile">
                  <CgProfile />
                  Profile
                </Option>
                <Option value="Write">
                  <SiWritedotas /> Write
                </Option>
                <Option value="Read">
                  <AiOutlineRead /> Read
                </Option>
                <Option value="logout">logout</Option>
              </Dropdown>
            </div>
          </DashContainer>
        </Wrapper>
      </>
    )
  );
};
const DashContainer = styled.div`
  max-height: 150px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Title = styled.h1`
  margin-top: 20px;
  margin-left: 100px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 40px; ;
`;
const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
`;
const LogOutButton = styled.button``;
const Dropdown = styled.select`
  color: black;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  background-color: white;
  background-size: cover;
  background-position: center;
  font-family: Futura, "Helvetica Neue", Helvetica, sans-serif;
  color: black;
  border: 5px solid white;
  outline: none;

  margin-right: 20px;
  padding: 20px 50px;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
    color: #6679cc;
  }
`;
const UserImg = styled.img`
  border-radius: 50px;
  width: 70px;
`;
const Wrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid grey;
  margin-top: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
const Option = styled.option`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;
export default DropDown;
