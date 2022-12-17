const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");

const Blog = require("./models/blog");

logger.info("connecting to", config.MONGODB_URI);

let blogs = [
  {
    id: 1,
    title: "reservoir dogs",
    author: "brown dog",
    url: "blog url",
    likes: 1,
  },
];

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

app.get("/api/blogs", (request, response) => {
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs);
  // });
  response.json(blogs);
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

// app.use("/api/blogs", blogsRouter);

app.use(middleware.requestLogger);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

module.export = app;
