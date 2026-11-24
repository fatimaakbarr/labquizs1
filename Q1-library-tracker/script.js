const API = "/books";
let books = [];

const form = document.getElementById("bookForm");
const table = document.getElementById("bookTable");
const filter = document.getElementById("filter");

// load books from the API (GET)
const loadBooks = async () => {
  const res = await fetch(API);
  books = await res.json();
  showBooks();
};

// show books in the table (applies the category filter)
const showBooks = () => {
  const list = filter.value === "All"
    ? books
    : books.filter((book) => book.category === filter.value);

  table.innerHTML = list.map((book) => `
    <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.category}</td>
      <td>${book.year}</td>
      <td><button class="btn btn-danger btn-sm" onclick="removeBook(${book.id})">Remove</button></td>
    </tr>
  `).join("");
};

// add book (form submit event) -> POST
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const category = document.getElementById("category").value;
  const year = document.getElementById("year").value;

  // validation: no empty fields
  if (title === "" || author === "" || category === "" || year === "") {
    alert("Please fill all fields");
    return;
  }

  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, category, year }),
  });
  const newBook = await res.json();

  books.push(newBook);
  showBooks();
  form.reset();
});

// remove book (click event) -> DELETE
const removeBook = async (id) => {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  books = books.filter((book) => book.id !== id);
  showBooks();
};

// category filter (change event)
filter.addEventListener("change", showBooks);

loadBooks();
