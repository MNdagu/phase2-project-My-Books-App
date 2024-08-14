import React, { useState, useEffect } from "react";
import BookCollection from "./components/BookCollection";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ReadingList from "./components/ReadingList";
import Navbar from "./components/Navbar";
import ViewDetails from "./components/ViewDetails";
import AddIsbn from "./components/AddIsbn";
import Speak from "./Speak"


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
  const removeBook =(fav)=>{
setFavourite(favourite.filter((book)=>book.id !== fav.id))
  }

  const handleAddnewBook = (newBook) => {
    setBooks([...books, newBook]);
  };


  return (
    <div className="App">
      <Navbar/>
      <h1>My Books App</h1>
      <Routes>
        <Route path="/" element={<BookCollection books={books} addBook={addBook}/>} />
        <Route path="/readinglist" element={<ReadingList favourite={favourite} removeBook={removeBook}/>} />
        <Route path="/viewdetails/:id" element={<ViewDetails books={books}/>}/>
        <Route path="/addisbn" element={<AddIsbn onAddnewBook={handleAddnewBook}/>}/>

      </Routes>
      
    </div>
  );
}

export default App;
