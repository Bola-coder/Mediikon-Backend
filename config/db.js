const mongoose = require("mongoose");

let db_url = process.env.MONGO_URL;
const db_password = process.env.DB_PASSWORD;

db_url = db_url.replace("<password>", db_password);

const connectToDB = () => {
  mongoose
    .connect(db_url)
    .then((con) => {
      console.log(`DB connected successfully`);
    })
    .catch((err) => {
      console.log(`Error when connecting to DB ${err}`);
    });
};

module.exports = connectToDB;
