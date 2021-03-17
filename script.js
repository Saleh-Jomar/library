let myLibrary = [];

const template = document.getElementById('template');
const libraryContainer = document.querySelector('.library-container');

window.onload = () => libraryContainer.removeChild(template);


//Object Book

class Book {
    constructor(name, author, pages, status) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

Book.prototype.info = function () {
    return `${this.name} by ${this.author}, ${this.pages} pages, ${this.status}.`;
}

Book.prototype.display = function () {
    const templateClone = template.cloneNode(true);
    const bookTitle = templateClone.querySelector('.bookTitle');
    const bookAuthor = templateClone.querySelector('.bookAuthor');
    const bookPages = templateClone.querySelector('.bookPages');
    const bookStatus =  templateClone.querySelector('.bookStatus');
    
    bookTitle.textContent = `"${this.name}"`;
    bookAuthor.textContent = this.author;
    bookPages.textContent = `${this.pages} pages`;
    bookStatus.checked = this.status;

    libraryContainer.prepend(templateClone);
}

//PopUp

const formPopUp = document.querySelector('.form-popup');
const overlay = document.querySelector('.overlay');
const addButton = document.querySelector('.add-button');


addButton.addEventListener('click', PopUp)
overlay.addEventListener('click', PopUp)

window.addEventListener('keydown', (e) => {
    if (overlay.classList.contains('overlay-active') && (e.key === "Escape")) PopUp();
});

function PopUp() {
    form.reset();
    formPopUp.classList.toggle('form-popup-active');
    overlay.classList.toggle('overlay-active');
}

//Form Submit

const form = formPopUp.querySelector('form')
form.addEventListener('submit', addBook);

function inputBook() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pagenumber').value;
    const readStatus = document.querySelector('#readStatus').checked;
    return new Book(title, author, pages, readStatus);

}
function addBook(e) {
    e.preventDefault();
    newBook = inputBook();
    if (myLibrary.some((book) => book.name === newBook.name)) {
        alert('This Book already exist in the Library')
        return;
    }
    myLibrary.push(newBook);
    newBook.display();
    PopUp();
}

//Library Manipulation