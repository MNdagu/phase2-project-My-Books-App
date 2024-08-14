import React, { useState, useEffect } from "react";
import BookCollection from "./components/BookCollection";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ReadingList from "./components/ReadingList";
import Navbar from "./components/Navbar";
import ViewDetails from "./components/ViewDetails";

function App() {
  const [books, setBooks] = useState([]);
  const [favourite,setFavourite] = useState([]);

  useEffect(() => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=isbn")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.items);
      });
  }, []);

  //function to add a book to the reading list
  function  addBook (bookToAdd){
    if (!favourite.find((book)=>book.id ===bookToAdd.id)){
      setFavourite([...favourite,bookToAdd])
    } else {
      alert ("I exist")
    }
  };

  // function to remove book from reading list
  const removeBook =(favourite)=>{
setFavourite(favourite.filter((book)=>book.id !== favourite.id))
  }


  return (
    <div className="App">
      <Navbar/>
      <h1>My Books App</h1>
      <Routes>
        <Route path="/" element={<BookCollection books={books} addBook={addBook}/>} />
        <Route path="/readinglist" element={<ReadingList addBook={addBook} favourite={favourite}/>} />
        <Route path="/viewdetails/:id" element={<ViewDetails books={books}/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
