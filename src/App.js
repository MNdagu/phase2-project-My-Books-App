import React, { useState, useEffect } from "react";
import BookCollection from "./components/BookCollection";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ReadingList from "./components/ReadingList";
import Navbar from "./components/Navbar";
import ViewDetails from "./components/ViewDetails";
import AddIsbn from "./components/AddIsbn";
import bookLogo from "./assets/book-open-regular-24.png";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";



function App() {
  const [books, setBooks] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=isbn")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.items);
      });
  }, []);

  //function to add a book to the reading list
  function addBook(bookToAdd) {
    if (!favourite.find((book) => book.id === bookToAdd.id)) {
      setFavourite([...favourite, bookToAdd]);
      navigate("/readinglist")
    } else {
      Swal.fire("Book is already in reading list!");
      
    }
  }

  // function to remove book from reading list
  const removeBook = (fav) => {
    setFavourite(favourite.filter((book) => book.id !== fav.id));
  };

  const handleAddnewBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">
        <img src={bookLogo} alt="Book Logo" className="book-logo" />
         Bibliophilia 
        <img src={bookLogo} alt="Book Logo" className="book-logo" />
        </h1>
      </div>

      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<BookCollection books={books} addBook={addBook} />}
        />
        <Route
          path="/readinglist"
          element={
            <ReadingList favourite={favourite} removeBook={removeBook} />
          }
        />
        <Route
          path="/viewdetails/:id"
          element={<ViewDetails books={books} />}
        />
        <Route
          path="/addisbn"
          element={<AddIsbn onAddnewBook={handleAddnewBook} />}
        />
      </Routes>
      <footer className="footer">
      <p>&copy; 2024 Bibliophilia. All rights reserved.</p>
      <p>Contact us: info@bibliophilia.com</p>
      <p>
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a> | 
        <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">Instagram</a>
      </p>
    </footer>
      
    </div>
  );
}

export default App;
