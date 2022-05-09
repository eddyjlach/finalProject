const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { v4: uuidv4 } = require("uuid");

const data = require("./data");
const { MONGO_URI } = process.env;
const fs = require("fs");

let story = fs.readFileSync("./story.txt", "utf8", (err, data) => {
  if (err) {
    console.error("error", err);
    return;
  }
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);
const db = client.db("finalProject");
let literature = {
  _id: uuidv4(),
  title: "To Build a Fire",
  author: "Jack London",
  genre: "Adventure",
  image:
    "https://res.cloudinary.com/dp8wexag9/image/upload/v1649252891/image_k07xk4.jpg",
  synopsis:
    "To Build a Fire is the story of a young miner who has come to the Yukon to find gold.",
  date: "1902",
  text: story,
};
const insertStories = async () => {
  try {
    await client.connect();
    const insertedStories = await db
      .collection("stories")
      .insertOne(literature);
    if (insertedStories.value) {
      console.log("stories inserted");
    } else {
      console.log(insertedStories);
      console.log("stories failed to insert");
    }
  } catch (err) {
    console.log(err);
  }

  client.close();
};
insertStories();
