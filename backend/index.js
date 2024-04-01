//index.js
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser. text({type: '/'}));



dotenv.config({ path: "./config.env" });
require("./database/connection");
const candidateProfileRouter = require('./router/candidateProfileRouter');
const employerProfileRouter = require('./router/employerProfileRouter'); 

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(require("./router/uploadResumeRoute"))
app.use(require("./router/authentication"))
app.use(require("./router/home"))
app.use(candidateProfileRouter);
app.use(employerProfileRouter);
app.use('/', require('./router/*'));

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

module.exports.handler = serverless(app);


