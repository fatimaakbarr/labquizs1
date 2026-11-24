const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.static(".")); // serves index.html at http://localhost:3000

const FILE = "books.json";

// read books from JSON file
function readBooks() {
  return JSON.parse(fs.readFileSync(FILE));
}

// save books to JSON file
function saveBooks(books) {
  fs.writeFileSync(FILE, JSON.stringify(books, null, 2));
}

// GET /books
app.get("/books", (req, res) => {
  res.json(readBooks());
});

// POST /books
app.post("/books", (req, res) => {
  const books = readBooks();
  const book = { id: Date.now(), ...req.body };
  books.push(book);
  saveBooks(books);
  res.json(book);
});

// DELETE /books/:id
app.delete("/books/:id", (req, res) => {
  const books = readBooks();
  const remaining = books.filter((b) => b.id != req.params.id);
  saveBooks(remaining);
  res.json({ message: "Book deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
