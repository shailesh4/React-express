const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let books = [
  {
    id: 1,
    categories: ["some", "other", "biology", "work", "sdf", "dfs"],
    title: "f3oiske",
    description: "sdfsfsafaffaf",
    markdown: false,
    date: "01-28-2020"
  },
  {
    id: 2,
    categories: ["some", "other", "bogy"],
    title: "bo2e",
    description: "sdfsfsafaffaf",
    markdown: false,
    date: "01-28-2020"
  },
  {
    id: 3,
    categories: ["som3ere", "other", "bogy"],
    title: "boi343e",
    description: "sdfsfsafaffaf",
    markdown: false,
    date: "01-28-2020"
  },
  {
    id: 4,
    categories: ["som", "other", "biology"],
    title: "boreke",
    description: "sdfsfsafaffaf",
    markdown: false,
    date: "01-28-2020"
  },
  {
    id: 5,
    categories: ["somwe", "other", "biology"],
    title: "feoike",
    description: "sdfsfsafaffaf",
    markdown: false,
    date: "01-28-2020"
  },
  {
    id: 6,
    categories: ["se", "other", "biology"],
    title: "boike",
    description: "sdfsfsafaffaf",
    markdown: false,
    date: "01-28-2020"
  },
  {
    id: 7,
    categories: ["soe", "other", "biology"],
    title: "boe",
    description: "sdfsfsafaffaf",
    markdown: false,
    date: "01-28-2020"
  }
];

let highest_id = 7;

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.post("/api/add", (req, res) => {
  console.log(req.body.post);
  newPost = req.body.post;
  newPost.id = highest_id + 1;
  highest_id = highest_id + 1; //so that the id is unique
  books = [...books, newPost];
  res.json(books);
});

app.post("/api/edit", (req, res) => {
  console.log(req.body);
  books.map(
    book =>
      book.id === req.body.post.id &&
      ((book.categories = req.body.post.categories),
      (book.title = req.body.post.title),
      (book.description = req.body.post.description),
      (book.markdown = req.body.post.markdown),
      (book.date = req.body.post.date))
  );
  res.json(books);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
