const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://farrar:${password}@cluster0.8nw3zjf.mongodb.net/blogList?retryWrites=true&w=majority`;

mongoose.connect(url);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

// const blog = new Blog({
//   title: "third title",
//   author: "third author",
//   url: "third url",
//   likes: 3,
// });

// blog.save().then((result) => {
//   console.log("blog saved!");
//   mongoose.connection.close();
// });

Blog.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
