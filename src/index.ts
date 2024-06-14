import express from "express";
import bodyParser from "body-parser";
import { router } from "./routes.js";
import cors from 'cors'

const port = 3000;
const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//using router where route is defined
app.use(router);

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
