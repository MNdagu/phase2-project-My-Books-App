import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Speak from "./Speak";

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
      <h2>{title}</h2>
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
      <button
        style={{ width: "10%", marginLeft: "700px", marginBottom: "10px" }}
        onClick={() => navigate("/")}
      >
        Back
      </button>
      {/* Pass the entire volumeInfo object to Speak as book */}
      <Speak book={volumeInfo} />
    </div>
  );
}

export default ViewDetails;
