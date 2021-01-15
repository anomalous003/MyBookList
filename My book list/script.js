 // Initialize book 
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    static validateForm(title, author, isbn){
        if (title === '' || author === '' || isbn === '') {
                let danger = document.querySelector('.danger');
                danger.style.display = 'block';
                setTimeout(() => {
                   danger.style.display = 'none'; 
                }, 2000);
                return false;
            }
        else{
            let success = document.querySelector('.book_added');
                success.style.display = 'block';
                setTimeout(() => {
                   success.style.display = 'none'; 
                }, 2000);
                return true;
            }
    }
}

// local storage class 
class Store {
    static getBookItem() {
        let books;
        if (localStorage.getItem('books') === null){
            books = []
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book, checker) {
        if (checker) {
            let books = Store.getBookItem();
            books.push(book)
            localStorage.setItem('books', JSON.stringify(books));            
        }
    }

    static removeBookFromStore(isbn) {
        let books = Store.getBookItem();

        for (let book of books) {
            if (book.isbn === isbn) {
                books.splice(books.indexOf(book), 1);
            }    
        }

        localStorage.setItem('books', JSON.stringify(books))
    }

}

// UI handler class 
class UI {
    static displayBooks() {
        const books = Store.getBookItem();

        for (let book of books) {
            UI.addToList(book, true);
        }
    }

    static addToList(book, checker){
        if (checker) {
            let list = document.querySelector('.book_list'),
                row = document.createElement('tr');
            
            row.innerHTML = `<tr> <td>${book.title}</td> <td>${book.author}</td> <td>${book.isbn}</td> <td><a href="#herf" class='remove'>X</a></td> </tr>`
    
            list.appendChild(row)
        }
    }

    static removeBook(el) {
        if (el.classList.contains('remove')) {
            el.parentNode.parentNode.remove()
        }
    }

    static reset(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// get inputs function
function getValues(e) {
    e.preventDefault();

    let title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value
    
    let checker = Book.validateForm(title, author, isbn);

    const book = new Book(title, author, isbn);
    Store.addBook(book, checker)
    UI.addToList(book, checker);
    UI.reset();
}

// Remove Book from list 
function removeFromList(e) {
    UI.removeBook(e.target)
    Store.removeBookFromStore(e.target.parentElement.previousElementSibling.textContent);
    let removeDiv = document.querySelector('.book_removed')
    removeDiv.style.display = 'block';
    setTimeout(() => {
        removeDiv.style.display = 'none'
    }, 2000)
}



// event listeners 
document.addEventListener('DOMContentLoaded', UI.displayBooks)

const form = document.getElementById('book_form');
form.addEventListener('submit', getValues);

const bookList = document.querySelector('.book_list');
bookList.addEventListener('click', removeFromList);