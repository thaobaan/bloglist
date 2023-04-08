const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
}, 100000);

describe("viewing blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("amount of blog posts are two", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toBe(helper.initialBlogs.length);
  });

  test("unique identifier property is named id", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });
});

describe("adding a blog", () => {
  test("a valid blog is added", async () => {
    const newBlog = {
      title: "testing bloglist",
      author: "tester",
      url: "testURL",
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain("testing bloglist");
  });

  test("blogs with missing likes property defaults to 0", async () => {
    const newBlog = {
      title: "testing bloglist",
      author: "tester",
      url: "testURL",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const likes = blogsAtEnd.map((b) => b.likes);
    expect(likes).toContain(0);
  });

  test("blog without title is not added", async () => {
    const newBlog = {
      author: "tester",
      url: "testURL",
      likes: 0,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("blog without url is not added", async () => {
    const newBlog = {
      title: "testing bloglist",
      author: "tester",
      likes: 0,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});





afterAll(() => {
  mongoose.connection.close();
});
