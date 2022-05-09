const { MongoClient } = require("mongodb");
const { format } = require("date-fns");
const { uuid } = require("uuidv4");
// const { uuid } = require("uuidv4");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const { v4: uuidv4 } = require("uuid");
const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");
    console.log("connected!");
    const readings = req.body.readings;
    const readers = req.body.readers;
    // const writersQuery = friends.map((friend) => {
    //   return { username: friend };
    // });
    if (readings.length || readers.length) {
      let foundReadings = null;
      let foundReaders = null;
      if (readings.length > 0) {
        foundReadings = await db
          .collection("users")
          .find({ username: { $in: readings } })
          .toArray();
      }
      if (readers.length) {
        foundReaders = await db
          .collection("users")
          .find({ username: { $in: readers } })
          .toArray();
      }

      res
        .status(200)
        .json({ status: 200, data: { foundReaders, foundReadings } });
    } else {
      res.status(400).json({ status: 400, message: "friends array empty" });
    }
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({ status: 400, message: "bad request" });
  }
};

const addFriend = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const currentUser = req.body.username;
  const addedUser = req.params.username;
  try {
    await client.connect();
    const db = client.db("finalProject");
    console.log("connected!");
    const query = { username: currentUser };
    const AddQuery = { username: addedUser };
    const newValuesReading = { $push: { reading: addedUser } };
    const newValuesReader = { $push: { readers: currentUser } };
    const foundUser = await db.collection("users").findOne(query);
    if (foundUser.reading.includes(addedUser)) {
      // client.close();
      return res.status(400).json({
        status: 400,
        message: "You have already added this individual",
      });
    }

    const ReadingsArray = await db
      .collection("users")
      .updateOne(query, newValuesReading);
    const ReadersArray = await db
      .collection("users")
      .updateOne(AddQuery, newValuesReader);
    res
      .status(200)
      .json({ status: 200, ReadersArray, message: "success", foundUser });
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({ status: 400, message: "bad request" });
  }
  client.close();
};
//

const postComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");
    console.log("connected!");
    const user = req.body.username;
    const date = format(new Date(), "yyyy-MM-dd");
    const newComment = {
      _id: uuidv4(),
      storyId: req.body._id,
      posted: date,
      user,
      comment: req.body.comment,
    };
    const comment = await db.collection("comments").insertOne(newComment);
    res.status(200).json({ status: 200, comment, message: "success" });
    client.close();
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({ status: 400, message: "bad request" });
  }
};
const getComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");
    console.log("connected!");
    const query = { storyId: req.params._id };
    const result = await db.collection("comments").find(query).toArray();
    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({ status: 400, message: "bad request" });
  }

  client.close();
};
const getUsersStories = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");
    console.log("connected!");
    const foundUser = await db
      .collection("users")
      .findOne({ username: req.params.username });
    const storiesQuery = foundUser.stories.map((storyId) => {
      return { _id: storyId };
    });
    const userStories = await db
      .collection("stories")
      .find({ $or: storiesQuery })
      .toArray();
    res.status(200).json({ status: 200, data: userStories });
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({ status: 400, message: "bad request" });
  }
  client.close();
};

const getAllUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");
    console.log("connected!");
    const result = await db.collection("users").find().toArray();
    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({ status: 400, message: "bad request" });
  }
  client.close();
};
const getAllStories = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");
    console.log("connected!");
    const result = await db.collection("stories").find().toArray();
    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({ status: 400, message: "bad request" });
  }
  client.close();
};
// gets a story by _id
const getStory = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");
    console.log("connected!");
    const _id = req.params._id;
    console.log(_id);
    const result = await db.collection("stories").findOne({ _id: _id });
    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({ status: 400, message: "bad request" });
  }
  client.close();
};
// const addreaders = async (req, res) => {
//   const client = new MongoClient(MONGO_URI, options);
//   await client.connect();
//   const db = client.db("finalProject");
//   console.log("connected!");
//   const query = { username: req.body.username };
//   const newReader = { $push: { readings: username } };
//   const newReading = { $push: { readers: username } };
// };
const addStory = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");
    console.log("connected!");
    const _id = uuidv4();
    const query = { username: req.body.username };
    const newValues = { $push: { stories: _id } };
    //posting new story.
    newStory = {
      _id: _id,
      username: req.body.username,
      title: req.body.title,
      synopsis: req.body.synopsis,
      genre: req.body.genre,
      value: req.body.value,
    };
    const story = await db.collection("stories").insertOne(newStory);
    const StoryArray = await db.collection("users").updateOne(query, newValues);
    res.status(200).json({ status: 200, story, message: "success" });
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({ status: 400, message: "bad request" });
  }
  client.close();
};
// query will be your firend username,
//this new values pushing to the readers array,
//pushh usernames,

// to retreive the user information when requested.
//if user does not sign in with google, we want to redir3ect to a sign in page, to put more information.with info with name, last name.
const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");
    console.log("connected!");
    const username = req.params.username;
    const result = await db.collection("users").findOne({ username });
    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({ status: 400, message: "bad request" });
  }
  client.close();
};
//to post a user inside of the mongoDB and retrieves info of that user
const userLogin = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");
    console.log("connected!");
    //we want to filter by Id
    const email = req.params.email;
    // const _id = req.params._id;
    const findUser = await db.collection("users").findOne({ email });
    console.log(req.body);
    if (!findUser) {
      const newUser = {
        //not a uuidVVVV we will use autho0 in local storage.
        // _id: _id,
        _id: req.body.sub,
        email: req.body["email"],
        email_verfied: req.body["email_verfied"],
        family_name: req.body["family_name"],
        given_name: req.body["given_name"],
        locale: req.body.locale,
        name: req.body.name,
        picture: req.body.picture,
        username: req.body.username,
        bio: req.body.bio,
        reading: [],
        readers: [],
        stories: [],
      };

      const result = await db.collection("users").insertOne(newUser);
      res.status(200).json({ status: 200, data: newUser, message: result });
    } else {
      res.status(200).json({ status: 200, data: findUser, message: "success" });
    }
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({ status: 400, message: "bad request" });
  }
  client.close();
};

//updating user information. Bio/username.
//checkt os ee if users info exists. If it does not we update the user info. if it exists we go to the profgile page.
const userUpdate = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");
    console.log("connected!");
    const _id = req.body._id;
    // const user = await db.collection("users").findOne({ _id });
    const checkUsername = await db
      .collection("users")
      .findOne({ username: req.body.username });
    const updatedInfo = {
      username: req.body.username,
      bio: req.body.bio,
    };

    if (checkUsername) {
      res.status(400).json({ status: 400, message: "This is user is taken." });
      // i need to check if the username exists in the data base.
      //probably need to map threw the arrrays.
      //question for eric, i first need to check to see if user has a username. if it doesnt it sends to a form page.
      //sif the user inputs a username thast eixsts in the data base, it has to come back negative and they need to write something else.
      // mapping through the usernames array.
    } else {
      const userBio = await db
        .collection("users")
        .updateOne(
          { _id },
          { $set: { username: req.body.username, bio: req.body.bio } }
        );
      if (userBio.modifiedCount > 0) {
        res.status(200).json({ status: 200, message: "success" });
      }
    }
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({ status: 400, message: "bad request" });
  }
  client.close();
};

module.exports = {
  getUsers,
  addFriend,
  getUsersStories,
  getComments,
  postComment,
  getAllUsers,
  getAllStories,
  addStory,
  getStory,
  getUser,
  userLogin,
  userUpdate,
};
