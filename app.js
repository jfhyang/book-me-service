const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

const clientRouter = require("./routes/client")
const userRouter = require("./routes/user");
const db = require("./models/db");

// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    res.send(req.headers["x-wx-openid"]);
  }
});
app.use("/api/client", clientRouter)
app.use("/api/user", userRouter)

const port = process.env.PORT || 80;
db.createBooks()
app.listen(port, () => {
  console.log("启动成功", port);
});
