let myLibrary = [];


class Book{
    constructor(name,author,pages,status){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
    }
}
Book.prototype.info = function(){
    return `${this.name} by ${this.author}, ${this.pages} pages, ${this.status}.`;
}

//PopUp

const formPopUp = document.querySelector('.form-popup');
const overlay = document.querySelector('.overlay');
const addButton = document.querySelector('.add-button');
const form = formPopUp.querySelector('form')

addButton.addEventListener('click',PopUp)
overlay.addEventListener('click',PopUp)

window.addEventListener('keydown', (e)=>{
    if (overlay.classList.contains('overlay-active')&&(e.key ==="Escape")) PopUp(); 
});

function PopUp(){
    form.reset();
    formPopUp.classList.toggle('form-popup-active');
    overlay.classList.toggle('overlay-active');
}
