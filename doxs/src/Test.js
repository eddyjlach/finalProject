import { useEffect, useState } from "react";
// import styled from "styled-components";

const Test = () => {
  const [story, setStory] = useState(null);
  useEffect(() => {
    fetch(`/get-story/94d737b8-20ab-43eb-9424-bf0adc387ac1`)
      .then((res) => res.json())
      .then((data) => {
        setStory(data.data);
        console.log(data);
      });
  }, []);

  return story && <p>{story.text}</p>;
};
export default Test;
