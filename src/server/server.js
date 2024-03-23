//server.js
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();

dotenv.config({ path: "./config.env" });
require("./database/connection");
const candidateProfileRouter = require('./router/candidateProfileRouter');
const employerProfileRouter = require('./router/employerProfileRouter'); 

app.use(express.json());
app.use(cors());
app.use(require("./router/authentication"))
app.use(require("./router/home"))
app.use(candidateProfileRouter);
app.use(employerProfileRouter); 


app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});


