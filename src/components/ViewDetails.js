import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Speak from './Speak';


function ViewDetails({ books }) {
  const { id } = useParams();
  const book = books.find((book) => book.id === id);
  const navigate = useNavigate();

  if (!book) {
    return <h2>Book not found</h2>;
  }

  const { volumeInfo } = book;
  const { title, authors, description, imageLinks, publishedDate, publisher } = volumeInfo;

  return (
    <div className="book-details">
      {imageLinks && <img src={imageLinks.thumbnail} alt={title} />}
      <div className='viewdetails'>
      <p><span className="details-header">Author(s):</span> {authors ? authors.join(', ') : 'Unknown Author'}</p>
        <p><span className="details-header">Published Date:</span> {publishedDate}</p>
        <p><span className="details-header">Publisher:</span> {publisher}</p>
        <p id="description"><span className="details-header">Description:</span> {description}</p>
      </div>
      <button
          style={{ width: "10%", marginLeft: "700px" , marginBottom:"10px"}}
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <Speak book={volumeInfo}/>

    </div>
  );
}

export default ViewDetails;