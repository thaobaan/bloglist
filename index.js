const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);

server.listen(config.PORT, () => {
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
