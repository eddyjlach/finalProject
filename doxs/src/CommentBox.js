import React, { useState } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";

const CommentBox = ({ _id, setUpdate, update }) => {
  const { userData, setUserData } = useContext(CurrentUserContext);

  const [comment, setComment] = useState(null);
  const postComment = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userData.username,
        _id: _id,
        comment: comment,
      }),
    };
    fetch("/post-comments", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setComment("");
        setUpdate(!update);
      });
  };

  return (
    <>
      <Container>
        <Label>Comment</Label>
        <Divider></Divider>
        <MidContainer>
          {userData && <Img src={userData.picture} />}
          <Input
            onChange={(ev) => {
              setComment(ev.currentTarget.value);
            }}
            name="comment"
            placeholder="Write your thoughts..."
            value={comment}
          />
          <Button onClick={postComment}>Comment</Button>
        </MidContainer>
      </Container>
    </>
  );
};
const Container = styled.div`
  margin-bottom: 20px;
`;
const Label = styled.label`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 50px;
  margin-left: 20px;
`;
const Divider = styled.div`
  border-bottom: 1px solid grey;
  width: 100vw;
  margin-bottom: 30px;
  margin-top: 30px;
`;
const Img = styled.img`
  border-radius: 50%;
  width: 40px;
`;
const MidContainer = styled.div`
  display: flex;
  margin: 0 auto;
  margin-left: 40px;
`;
const Input = styled.textarea`
  margin-left: 10px;
  resize: none;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  width: 400px;
`;
const Button = styled.button`
  margin-left: 10px;
`;
export default CommentBox;
