import React, { useState, useEffect } from "react";
import BookCollection from "./components/BookCollection";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ReadingList from "./components/ReadingList";
import Navbar from "./components/Navbar";
import ViewDetails from "./components/ViewDetails";
import BookTracker from "./Booktracker";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {

    fetch("https://www.googleapis.com/books/v1/volumes?q=isbn")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.items);
      });
      
  }, []);

  function handleDelete(bookId){
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn ${bookId}`,{
      method: "DELETE",

    })
    .then((response)=>response.json())

    .then(()=>{
      setBooks(books.filter((book)=>book.id!==bookId));
    })
  }

  return (
    <div className="App">
      <Navbar/>
      <h1>My Books App</h1>
      <Routes>
        <Route path="/" element={<BookCollection books={books} handleDelete={handleDelete}/>} />
        <Route path="/readinglist" element={<ReadingList books={books}/>} />
        <Route path="/viewdetails/:id" element={<ViewDetails books={books}/>}/>
        <Route path="/booktracker" element={<BookTracker/>}/>
      </Routes>
    </div>
  );
}

export default App;
