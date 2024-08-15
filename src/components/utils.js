export const downloadCSV = (books) => {
    const csvRows = [];
    
    
    const headers = ['Title', 'Authors', 'Publisher', 'Published Date', 'Description'];
    csvRows.push(headers.join(','));
  
    
    books.forEach(book => {
      const { title, authors, publisher, publishedDate, description } = book.volumeInfo;
      
      
      const row = [
        `"${title || ''}"`,  // Wrap in quotes to handle commas in title
        `"${authors ? authors.join('; ') : ''}"`,  // Join authors by semicolon
        `"${publisher || ''}"`,  
        `"${publishedDate || ''}"`,  
        `"${description ? description.replace(/"/g, '""') : ''}"`  
      ];
      csvRows.push(row.join(','));
    });
  
    const csvContent = csvRows.join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'books.csv');
    link.click();
  };
  
  export const downloadJSON = (books) => {
    const jsonContent = JSON.stringify(books, null, 2);
  
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'books.json');
    link.click();
  };
  
  export const parseCSV = (file, onBooksParsed) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvContent = event.target.result;
      const lines = csvContent.split('\n');
  
      const books = lines.slice(1).map(line => {
        const data = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); 
        const book = {
          volumeInfo: {
            title: data[0].replace(/"/g, '') || '',
            authors: data[1] ? data[1].replace(/"/g, '').split('; ') : [],
            publisher: data[2].replace(/"/g, '') || '',
            publishedDate: data[3].replace(/"/g, '') || '',
            description: data[4].replace(/"/g, '') || ''
          }
        };
        return book;
      });
  
      onBooksParsed(books);
    };
  
    reader.readAsText(file);
  };
  