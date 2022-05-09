import React from "react";
import DropDown from "./DropDown";
import CommentBox from "./CommentBox";
import CommentSection from "./CommentSection";
import Footer from "./Footer";

import { useState } from "react";
import styled from "styled-components";
//gets an individual story.
import { useEffect } from "react";
import { useParams } from "react-router-dom";
//when a user clicks a story, it will bring them here.
const FullText = () => {
  const [update, setUpdate] = useState(false);
  const [title, setTitle] = useState(null);
  const [story, setStory] = useState(null);
  const { _id } = useParams();

  useEffect(() => {
    fetch(`/get-story/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        // one for the story
        setStory(data.data?.value);
        //one for the Title
        setTitle(data.data);
      });
  }, []);
  return (
    <>
      <DropDown />

      {story && title && (
        <>
          <Wrapper>
            <Title>{title.title}</Title>
            <Author>
              <Span>by: </Span>

              {title.username}
            </Author>
            <Divider></Divider>
            {story && (
              <Story dangerouslySetInnerHTML={{ __html: story }}></Story>
            )}
          </Wrapper>
          <CommentBox _id={_id} update={update} setUpdate={setUpdate} />
          <CommentSection _id={_id} update={update} setUpdate={setUpdate} />
          <Footer />
        </>
      )}
    </>
  );
};
const Wrapper = styled.div`
  width: 50vw;
  margin: 0 auto;
`;
const Story = styled.p`
  line-height: 30px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;
const Title = styled.h1`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;
const Author = styled.h2`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 15px;
`;
const Span = styled.span`
  font-weight: normal;
`;
const Divider = styled.div`
  border-bottom: 2px solid grey;
`;
export default FullText;

// {
//   username,
//   comment,
//   story they commented
// }
