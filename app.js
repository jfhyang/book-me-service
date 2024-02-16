const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const clientRouter = require("./routes/client")
const userRouter = require("./routes/user");
const books = require("./models/books");

const logger = morgan("tiny");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);


app.use("/api/client", clientRouter)
app.use("/api/user", userRouter)

const port = process.env.PORT || 80;
books.createTable()
app.listen(port, () => {
  console.log("启动成功", port);
});
