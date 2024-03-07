const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });
require("./database/connection");

app.use(express.json());
app.use(require("./router/authentication"));

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});