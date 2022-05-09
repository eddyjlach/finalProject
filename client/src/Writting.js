import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useHistory } from "react-router-dom";
import DropDown from "./DropDown";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Footer from "./Footer";

const Writting = () => {
  let history = useHistory();
  const { currentuser, setCurrentuser, userData, setUserData } =
    useContext(CurrentUserContext);
  let quillRef = useRef();
  const [value, setValue] = useState("");
  const [story, setstory] = useState({});
  const [info, setInfo] = useState({});
  const addStory = (ev) => {
    setInfo({ ...info, [ev.target.name]: ev.target.value });
  };
  //on submit this will post the story inside of data base.
  const postingStory = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...info,
        //for the text itself as a string
        // value: quillRef.editor.getText(),
        value,
        avatar: userData.picture,
        username: userData.username,
        title: info.title,
        genre: info.genre,
        synopsis: info.synopsis,
      }),
    };
    fetch("/add-story", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setstory(data.data);
        console.log(data.data);
        // sessionStorage.setItem("user", JSON.stringify(data.data));
        if (data.status === 200) {
          // setRefresh(!refresh);
          history.push(`/full-text/${data.story.insertedId}`);
        }
        console.log(data);
      });
  };

  useEffect(() => {
    if (value.length) {
      console.log(quillRef.editor.getText());
    }
    //  to get strings.
  }, [value]);
  return (
    <>
      <DropDown />
      <Container>
        <Form onSubmit={postingStory}>
          <div>
            <Title
              onChange={addStory}
              name="title"
              required
              placeholder="Write your Title here..."
            />
          </div>
          <div>
            <MidContainer>
              <div></div>

              <div>
                <Input
                  onChange={addStory}
                  name="genre"
                  placeholder="Genre"
                  required
                ></Input>
              </div>
            </MidContainer>
          </div>
          <div>
            <Synopsis
              onChange={addStory}
              name="synopsis"
              required
              placeholder="Whats this Story about?"
            />
          </div>
          <PublishContainer>
            <button>Publish</button>
          </PublishContainer>
        </Form>
      </Container>
      <TextEditor>
        <ReactQuill
          ref={(node) => {
            quillRef = node;
          }}
          theme="snow"
          value={value}
          onChange={setValue}
          style={{ width: "50vw" }}
        />
      </TextEditor>
      <Footer />
    </>
  );
};
const PublishContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const MidContainer = styled.div``;
const Container = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  line-height: 40px;
  margin-bottom: 20px;
`;

const Title = styled.input`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  border: none;

  font-size: 30px;
  outline: none;
`;
const Input = styled.input`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  border: none;
  outline: none;
  max-width: 400px; ;
`;
const Synopsis = styled.textarea`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  resize: none;
  width: 400px;
  height: 50px;
  border: none;
  outline: none;
`;

const Form = styled.form`
  margin-right: 100px;
`;
const Label = styled.label`
  margin-right: 50px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  border: none;
  font-weight: normal;
  font-size: 20px;
`;

const TextEditor = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;
export default Writting;
