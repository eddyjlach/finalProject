import React, { useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Form = () => {
  let history = useHistory();
  const { user, isAuthenticated } = useAuth0();
  const {
    currentUser,
    setCurrentUser,
    userData,
    setUserData,
    refresh,
    setRefresh,
  } = useContext(CurrentUserContext);
  const [info, setInfo] = useState({});
  const addingInfo = (ev) => {
    setInfo({ ...info, [ev.target.name]: ev.target.value });
  };
  //posting the userinfo/bio to the data base which will then render the start writting page.
  const postingInfo = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...info, _id: user.sub }),
    };
    fetch("/user/update", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.data);
        sessionStorage.setItem("user", JSON.stringify(data.data));
        if (data.status === 200) {
          console.log("cock");
          setRefresh(!refresh);
          history.push("/profile-page");
        }
        console.log(data);
      });

    console.log(info);
  };
  return (
    <Container>
      <Cont>
        <FillForm onSubmit={postingInfo}>
          <Username>
            <div>
              <Label>Username</Label>
            </div>
            <Input
              onChange={addingInfo}
              name="username"
              required
              placeholder="Username..."
            />
          </Username>
          <Bio>
            <div>
              <Label>Bio</Label>
            </div>
            <Input
              onChange={addingInfo}
              name="bio"
              required
              placeholder="Tell us about yourself..."
            />
          </Bio>
          <DivButton>
            <Button>Submit</Button>
          </DivButton>
        </FillForm>
      </Cont>
    </Container>
  );
};
const Cont = styled.div`
  border: 2px solid grey;
  padding: 50px;
  background-color: white;
`;
const Input = styled.input`
  padding: 10px;
`;
const Button = styled.button`
  width: 165px;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;
const Label = styled.label``;
const FillForm = styled.form``;
const Container = styled.div`
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 50px;

  display: flex;
`;
const Username = styled.div``;
const Bio = styled.div`
  margin-top: 10px;
`;
const DivButton = styled.div`
  margin-top: 10px;
`;
export default Form;
// {username:ev.target.value, bio:ev.target.value}
//xchnage the thuing in auth0 back to home page redirect.
