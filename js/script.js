// script.js
let books = [];

function getBooksFromStorage() {
  const storedBooks = localStorage.getItem('books');
  if (storedBooks) {
    books = JSON.parse(storedBooks);
  }
}

function saveBooksToStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

function addBookToCollection(title, author) {
  const book = {
    id: Math.floor(Math.random() * 1000),
    title,
    author,
  };
  books.push(book);
  saveBooksToStorage();
}

function removeBookFromCollection(id) {
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    saveBooksToStorage();
  }
}

function displayBooks() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  books.forEach((book) => {
    const bookItem = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const removeButton = document.createElement('button');

    bookTitle.textContent = `Title: ${book.title}`;
    bookAuthor.textContent = `Author: ${book.author}`;
    removeButton.textContent = 'Remove';

    removeButton.addEventListener('click', () => {
      removeBookFromCollection(book.id);
      displayBooks();
    });

    bookItem.appendChild(bookTitle);
    bookItem.appendChild(bookAuthor);
    bookItem.appendChild(removeButton);

    bookList.appendChild(bookItem);
  });
}

function addBook() {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title && author) {
    addBookToCollection(title, author);
    titleInput.value = '';
    authorInput.value = '';
    displayBooks();
  }
}

getBooksFromStorage();
displayBooks();

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addBook);