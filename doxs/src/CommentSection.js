import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CommentSection = ({ _id, update }) => {
  const [comments, setComments] = useState(null);
  useEffect(() => {
    fetch(`/get-comments/${_id}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.data);
        console.log(data.data);
      });
  }, [update]);
  return (
    <>
      {/* <Divider></Divider> */}
      <Container>
        {comments &&
          comments.map((comment) => {
            return (
              <div>
                <User>-{comment.user}:</User>
                <Comment>{comment.comment}</Comment>

                <Time>{comment.posted}</Time>
              </div>
            );
          })}
      </Container>
    </>
  );
};
const Divider = styled.div`
  border-bottom: 2px solid grey;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Time = styled.span`
  margin-left: 10px;
`;
const Comment = styled.span``;
const User = styled.h1`
  font-size: 20px;
  margin-right: 10px;
`;
const Container = styled.div`
  padding: 10px;
  margin-left: 100px;
  display: flex;
  border: 1px solid grey;
  align-items: flex-start;
  max-width: 800px;
  border-radius: 9px;
  flex-direction: column;
`;
export default CommentSection;
