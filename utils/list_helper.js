const dummy = (blogs) => {
  blogs;

  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((a, b) => (a.likes > b.likes ? a : b));
};

const mostBlogs = (blogs) => {
  const result = blogs.reduce((authors, blog) => {
    let known = authors.find((found) => {
      return found.author === blog.author;
    });

    if (!known) {
      return authors.concat({ author: blog.author, blogs: 1 });
    }
    known.blogs++;

    return authors;
  }, []);

  return result.reduce((a, b) => (a.blogs > b.blogs ? a : b));
};

const mostLikes = (blogs) => {
  const result = blogs.reduce((authors, blog) => {
    let known = authors.find((found) => {
      return found.author === blog.author;
    });

    if (!known) {
      return authors.concat({ author: blog.author, likes: blog.likes });
    }

    known.likes += blog.likes;

    return authors;
  }, []);

  return result.reduce((a, b) => (a.likes > b.likes ? a : b));
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
