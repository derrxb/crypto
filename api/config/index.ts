import express = require("express");
const cors = import("cors");

const app = express();
const router = express.Router();

// app.use(cors);

// Configuring body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(4000, () =>
  console.log(`Hello world app listening on port ${4000}!`)
);

export { router, app };
