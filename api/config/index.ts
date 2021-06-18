import express = require("express");
const cors = import("cors");
import Cache from "../app/infrastructure/redis";

const app = express();
const router = express.Router();

app.locals.cache = async () => new Cache(process.env.REDISCLOUD_URL);

const domain = "https://60ccddce341eb639ea611453--crypto-realtime.netlify.app";
export const whitelist = [`http://localhost:3000`, domain];

const corsOptions = (request: any, callback: any) => {
  let corsOptions;

  if (whitelist.indexOf(request.header("Origin") || "") !== -1) {
    corsOptions = {
      origin: true,
    };
  } else {
    corsOptions = { origin: false };
  }

  callback(null, corsOptions);
};

// Configuring body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(process.env.PORT || 4000, () =>
  console.log(`Hello world app listening on port ${process.env.PORT || 4000}!`)
);

export { router, app, corsOptions };
