exports.dummy = (blogs) => {
  return blogs.length;
};

exports.totalLikes = (blogs) => {
  return blogs.map((el) => el.likes).reduce((a, b) => a + b);
};
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];
exports.favoriteBlog = (blogs) => {
  const mostLikedBlogValue = Math.max(...blogs.map((el) => el.likes));
  return blogs.filter((el) => el.likes === mostLikedBlogValue);
};

exports.authorWithMostBlog = (blogs) => {
  const val = blogs.reduce((acc, cur) => {
    acc[cur.author] = (acc[cur.author] || 0) + 1;

    // console.log(acc);
    return acc;
  }, {});
  const mostBlog = [];
  const hightestValue = Math.max(...Object.values(val));
  Object.keys(val).forEach((el) => {
    mostBlog.push({
      author: el,
      blogs: val[el],
    });
  });
  return mostBlog.filter((el) => el.blogs === hightestValue);
};

exports.authorWithMostLikes = (blogs) => {
  return blogs.reduce((acc, cur) => {
    if (cur.likes > (acc.likes || 0)) {
      acc = {
        author: cur.author,
        likes: cur.likes,
      };
    }
    return acc;
  }, {});
};
