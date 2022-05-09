const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cloudinary = require("cloudinary");

const PORT = 8000;

require("dotenv").config();
const { CLOUD_NAME, API_KEY, API_SECRET, MONGO_URI } = process.env;

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const {
  getUsers,
  addFriend,
  getUsersStories,
  postComment,
  getComments,
  getAllUsers,
  getAllStories,
  getStory,
  userLogin,
  getUser,
  userUpdate,
  addStory,
} = require("./handlers");
app.post("/get-users", getUsers);
app.post("/add-friend/:username", addFriend);
app.get("/get-users-stories/:username", getUsersStories);
app.post("/post-comments", postComment);
app.get("/get-comments/:_id", getComments);
app.get("/users", getAllUsers);
app.get("/get-story", getAllStories);
app.get("/get-story/:_id", getStory);
app.get("/user/:username", getUser);
app.post("/user-info/:email", userLogin);
app.post("/add-story", addStory);
//need to check to see if username exists.
app.patch("/user/update", userUpdate);

app.listen(PORT, () => console.log(`listenning on Port ${PORT}`));
// {
//     _id: "call of chtulu3453453453453454"
//     title:
//     imge:https://res.cloudinary.com/dp8wexag9/image/upload/v1649183185/lovecraft.jpg
//     author: hp Lovraft
//     genre: horror
//     text: idfhsekdujfhsdkjfhsdjk
// }
// {
//    _id: "dunwhich horror"
//     author: hp Lovraft
//     genre: horror
//     text: idfhsekdujfhsdkjfhsdjk
// }
