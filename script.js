// ----------- LOGIN VALIDATION -----------
function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "user" && password === "pass") {
        sessionStorage.setItem("loggedIn", "true");
        window.location.href = "home.html";
    } else {
        document.getElementById("messageArea").innerText = "Invalid credentials!";
    }
    return false;
}

function checkSession() {
    if (!sessionStorage.getItem("loggedIn")) {
        window.location.href = "index.html";
    }
}

function logout() {
    sessionStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

// ----------- PASSWORD TOGGLE -----------
function togglePassword() {
    const passwordField = document.getElementById("password");
    const icon = document.querySelector(".toggle-password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.textContent = "🙈";
    } else {
        passwordField.type = "password";
        icon.textContent = "👁️";
    }
}

// ----------- BOOK DATA -----------
const books = [
    { title: "Java Programming", available: true ,  image: "images/java.jpg" },
    { title: "Web Development", available: false , image: "images/web.jpg"},
    { title: "Database Systems", available: true , image: "images/ds.jpg"},
    { title: "Artificial Intelligence", available: true  , image: "images/ai.jpg"},
    { title: "Introduction to Algorithms",available: true , image: "images/algo.jpg"},
    { title: "The Book of Why",available: true , image: "images/why.jpg"},
    { title: "The C Programming Language. 2nd Edition",available: false , image: "images/c.jpg"},
    { title: "Operating System Concepts",available: true , image: "images/os.jpg"},
    { title: "Introduction to the Theory of Computation",available: true , image: "images/tc.jpg"},
    { title: "Big Data",available: true , image: "images/bd.jpg"},
    { title: "Computer and Programming Languages",available: true , image: "images/clang.jpg"},
    { title: "History of Computing and Computers",available: true , image: "images/hist.jpg"},
    { title: "Neural Networks",available: true , image: "images/nn.jpg"},
    { title: "Internet of Things (IoT)",available: true , image: "images/iot.jpg"},
    { title: "Machine Learning",available: true , image: "images/ml.jpg"},
];

// ----------- HOME PAGE FUNCTIONALITY -----------
function loadBooks() {
    const bookList = document.getElementById('bookList');
    if (!bookList) return;  // Prevent error on non-home pages

    bookList.innerHTML = "";

    books.forEach((book, index) => {
        const statusText = book.available ? "Available" : "Issued";
        const statusColor = book.available ? "green" : "red";

        const card = document.createElement('div');
        card.className = "book-card";
        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="book-img">
            <h3>${book.title}</h3>
            <div class="status" style="color: ${statusColor}">${statusText}</div>
            <button onclick="goToBorrow(${index})" ${book.available ? "" : "disabled"}>
                ${book.available ? "Borrow" : "Unavailable"}
            </button>
        `;
        bookList.appendChild(card);
    });
}

function searchBooks() {
    const input = document.getElementById("searchBar").value.toLowerCase();
    const cards = document.querySelectorAll('.book-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(input) ? "block" : "none";
    });
}

function goToBorrow(index) {
    localStorage.setItem("selectedBook", JSON.stringify(books[index]));
    window.location.href = "borrow.html";
}

// ----------- BORROW PAGE FUNCTIONALITY -----------
function loadBorrowPage() {
    const book = JSON.parse(localStorage.getItem("selectedBook"));
    if (!book) return;

    document.getElementById("bookTitle").innerText = book.title;
    document.getElementById("bookImage").src = book.image;
    document.getElementById("bookImage").alt = book.title;
    document.getElementById("bookStatus").innerText = book.available ? "Available" : "Issued";
    document.getElementById("bookStatus").style.color = book.available ? "green" : "red";

    window.confirmBorrow = function () {
        const msg = document.getElementById("notification");
        if (book.available) {
            msg.innerText = "Book successfully borrowed!";
            msg.style.color = "green";
        } else {
            msg.innerText = "Sorry, this book is currently issued.";
            msg.style.color = "red";
        }
    };
}

window.onload = function () {
    checkSession();

    const bookList = document.getElementById("bookList");
    if (bookList) {
        loadBooks();
    }

    const borrowTitle = document.getElementById("bookTitle");
    const book = JSON.parse(localStorage.getItem("selectedBook"));

    if (borrowTitle && book) {
        // Borrow Page
        document.getElementById("bookTitle").innerText = book.title;
        document.getElementById("bookImage").src = book.image;
        document.getElementById("bookImage").alt = book.title;
        document.getElementById("bookStatus").innerText = book.available ? "Available" : "Issued";
        document.getElementById("bookStatus").style.color = book.available ? "green" : "red";

        window.confirmBorrow = function () {
            const msg = document.getElementById("notification");
            if (book.available) {
                msg.innerText = "Book successfully borrowed!";
                msg.style.color = "green";
            } else {
                msg.innerText = "Sorry, this book is currently issued.";
                msg.style.color = "red";
            }
        };
    }

    const paymentForm = document.getElementById("paymentForm");
    if (paymentForm && book) {
        document.getElementById("bookTitle").innerText = book.title;

        paymentForm.addEventListener("submit", function (e) {
            e.preventDefault();
            document.getElementById("paymentMessage").innerText = "Payment Successful! Book has been issued.";
            document.getElementById("paymentMessage").style.color = "green";

            setTimeout(() => {
                window.location.href = "home.html";
            }, 2000);
        });
    }
};
