let books = JSON.parse(localStorage.getItem('books')) || [];

function renderBooks(){
    const listDisplay =  document.getElementById('list');
    listDisplay.innerHTML = ``;

    books.forEach((book, index) =>{
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        const spanTitle = document.createElement('span');
        spanTitle.textContent = book.title;
        const spanAuthor = document.createElement('span');
        spanAuthor.textContent = book.author;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => removeBook(index));

        bookDiv.appendChild(spanTitle);
        bookDiv.appendChild(spanAuthor);
        bookDiv.appendChild(removeBtn);

        listDisplay.appendChild(bookDiv);
        
    }); 
}


function addBook(){
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const title = titleInput.value;
    const author = authorInput.value;

    if(title && author){
        const bookData = {
            title, author
        };
        books.push(bookData);
        localStorage.setItem('books', JSON.stringify(books));
        titleInput.value = '';
        authorInput.value = ''; 
        renderBooks();
    }
}

function removeBook(index) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
}

const addButton = document.getElementById('add');
addButton.addEventListener('click', addBook);
renderBooks();