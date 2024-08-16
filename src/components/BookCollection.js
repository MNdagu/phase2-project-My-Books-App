import React, { useState } from 'react';
import BookCard from './Bookcard';
import ImportExport from './ImportExport';
import Swal from 'sweetalert2'


function BookCollection({ books, addBook, importBooks, setBooks }) {
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

  const deleteBook = (bookToDelete) => {
    Swal.fire({
      title: "Are you sure you want to delete this book?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        setBooks(books.filter(book => book.id !== bookToDelete.id));
        Swal.fire("Book deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Cancelled delete", "", "info");
      }
    });
  };
  

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
            deleteBook={deleteBook}
              key={book.id}
              book={book}
              addBook={addBook}
              added={false}
              del={true}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <ImportExport books={books} onBooksImport={importBooks}/>

      
    </>
  );
}

export default BookCollection;
