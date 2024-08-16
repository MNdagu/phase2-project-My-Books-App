import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookTracker from "./BookTracker";
import Speak from "./Speak";

function ViewDetails({ books }) {
  const { id } = useParams();
  const book = books.find((book) => book.id === id);
  const navigate = useNavigate();

  if (!book) {
    return <h2>Book not found</h2>;
  }

  const { volumeInfo } = book;
  const {
    title,
    authors,
    description,
    imageLinks,
    publishedDate,
    publisher,
    industryIdentifiers,
  } = volumeInfo;
  const isbn = industryIdentifiers?.find(
    (id) => id.type === "ISBN_13"
  )?.identifier;

  return (
    <div className="book-details">
      {imageLinks && <img src={imageLinks.thumbnail} alt={title} />}
      <h2>{title}</h2>
      <p>
        <strong>ISBN code:</strong> {isbn}
      </p>
      <p>
        <strong>Author(s):</strong>{" "}
        {authors ? authors.join(", ") : "Unknown Author"}
      </p>
      <p>
        <strong>Published Date:</strong> {publishedDate}
      </p>
      <p>
        <strong>Publisher:</strong> {publisher}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>

      <Speak book={volumeInfo} />
      <BookTracker isbn={isbn} />
      <button className="back" onClick={() => navigate("/collection")}>
        Back
      </button>
    </div>
  );
}

export default ViewDetails;
