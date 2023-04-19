const dotenv = require("dotenv");
dotenv.config();
const connectToDB = require("./config/db");

const app = require("./app");

const port = process.env.PORT || 8008;

connectToDB();
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
