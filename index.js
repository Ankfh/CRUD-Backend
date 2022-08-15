const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./router/user");
const path = require("path");
const fileupload = require("express-fileupload");
const postRouter = require("./router/post");
const missionRouter = require("./router/mission");

const connectDB = require("./db");
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  fileupload({
    limits: { fileSize: 2 * 1024 * 1024 }, // 2mb
    abortOnLimit: true, // if limit is reached return 413
    createParentPath: true,
    useTempFiles: true,
  })
);

app.use("/public", express.static(path.join(__dirname, "/public")));
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/mission", missionRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running 0n localhost:${port}`);
});
