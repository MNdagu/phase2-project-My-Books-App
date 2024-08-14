import React from "react";
import { Link } from "react-router-dom";

function BookCard({ book, addBook, added, removeBook}) {
  const { id, volumeInfo } = book;
  const { title, authors, imageLinks } = volumeInfo;

  return (
    <div className="book-card">
      {imageLinks && <img src={imageLinks.thumbnail} alt={title} />}
      <div className="details">
      <h3>{title}</h3>
      <p>{authors ? authors.join(", ") : "Unknown Author"}</p>
      <Link to={`/viewdetails/${id}`}>View Details</Link>
      <div className="add">
        {added 
      ?<button onClick={() => removeBook(book)}>Remove from list</button>
      :<button onClick={() => addBook(book)}> Add to your list</button> 
      }
      </div>
      </div>
    </div>
  );
}

export default BookCard;
