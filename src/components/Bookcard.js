import React from "react";
import { Link } from "react-router-dom";

function BookCard({ book, addBook, added, removeBook}) {
  const { id, volumeInfo } = book;
  const { title, authors, imageLinks } = volumeInfo;

  return (
    <div className="book-card">
      {imageLinks && <img src={imageLinks.thumbnail} alt={title} />}
      <h3>{title}</h3>
      <p>{authors ? authors.join(", ") : "Unknown Author"}</p>
      <Link to={`/viewdetails/${id}`}>View Details</Link>
      {added 
      ?<button onClick={() => removeBook(book)}>Remove from list</button>
      :<button onClick={() => addBook(book)}> Add to your list</button> 
      
      }
    </div>
  );
}

export default BookCard;
