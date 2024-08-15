import React, { useState } from 'react';
import BookCard from './Bookcard';
import ImportExport from './ImportExport';

function BookCollection({ books, addBook, importBooks }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  // Filter books based on search query
  const filteredBooks = books.filter((book) => {
    const title = book.volumeInfo.title.toLowerCase();
    const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ').toLowerCase() : '';
    const query = searchQuery.toLowerCase();
    return title.includes(query) || author.includes(query);
  });

function BookCollection({ books, addBook }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter books based on search query
  const filteredBooks = books.filter((book) => {
    const title = book.volumeInfo.title.toLowerCase();
    const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ').toLowerCase() : '';
    const query = searchQuery.toLowerCase();
    return title.includes(query) || author.includes(query);
  });

  return (
    <>
      <h2>My Books Collection</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="book-collection">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              addBook={addBook}
              added={false}
            />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
      <ImportExport books={books} onBooksImport={importBooks}/>
    </>
  );
}

export default BookCollection;
