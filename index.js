const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.use(middleware.requestLogger);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});



// const app = require("./app"); // the actual Express application
// const express = require("express");
// const app = express();
// const http = require("http");
// const config = require("./utils/config");
// const logger = require("./utils/logger");

// const server = http.createServer(app);

// app.get("/", (req, res) => {
//   res.json({ a: "b" });
// });

// app.listen(config.PORT, () => {
//   logger.info(`Server running on port ${config.PORT}`);
// });

// let blogs = [
//   {
//     id: 1,
//     title: "reservoir dogs",
//     author: "brown dog",
//     url: "",
//     likes: 1,
//   },

//   {
//     id: 1,
//     title: "pulp fiction",
//     author: "quentin tarantino",
//     url: "",
//     likes: 2,
//   },
//   {
//     id: 1,
//     title: "kill bill",
//     author: "uma turman",
//     url: "",
//     likes: 3,
//   },
// ];
