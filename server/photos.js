const cloudinary = require("cloudinary");
require("dotenv").config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});
cloudinary.v2.uploader.upload(
  "https://www.chicagotribune.com/resizer/eGvWEzuOpPZ2ccznLEUXt0BKHyk=/800x1004/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/KYITLGXQCBCBDKRJMZFQBBBODE.jpg",
  { public_id: "lovecraft" },
  function (error, result) {
    console.log(result);
  }
);
