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
    const bookStatus = templateClone.querySelector('.bookStatus');

    bookTitle.textContent = `"${this.name}"`;
    bookAuthor.textContent = this.author;
    bookPages.textContent = `${this.pages} pages`;
    bookStatus.checked = this.status;
    templateClone.id = myLibrary.length - 1

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
    saveLocal();
}

//Library Manipulation

function indexAdjust(index) {
    const books = document.getElementsByClassName('book');
    adjust = myLibrary.length - 1;
    stopIndex = myLibrary.length - index;
    for (let i = 0; i < stopIndex; i++) {
        books[i].id = adjust;
        adjust -= 1;
    }
}

function remove(index) {
    myLibrary.splice(index, 1);
    libraryContainer.removeChild(document.getElementById(`${index}`));
    indexAdjust(index);
}

libraryContainer.addEventListener('click', libraryModify);

function libraryModify(e) {
    if (e.target.classList.contains('remove-button')) {
        index = e.target.parentNode.parentNode.id;
        remove(index);
    }
    if (e.target.classList.contains('bookStatus')) {
        index = e.target.parentNode.parentNode.parentNode.id;
        myLibrary[index].status = e.target.checked
    }
    saveLocal();
}

//Local Storage

function saveLocal() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function initiate() {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    if (myLibrary === null) myLibrary = [];
    for (let i=0; i<myLibrary.length; i++){
        myLibrary[i].display();
    }
}
initiate();