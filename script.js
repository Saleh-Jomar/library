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

function addBookToLibrary(){
    
}

