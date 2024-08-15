import React from 'react';
import { downloadJSON, downloadCSV, parseCSV } from './utils';

function ImportExport({ books, onBooksImport }) {
  const handleExportJSON = () => {
    downloadJSON(books, 'books.json');
  };

  const handleExportCSV = () => {
    downloadCSV(books, 'books.csv');
  };

  const handleImportCSV = (event) => {
    const file = event.target.files[0];
    if (file) {
      parseCSV(file, (data) => {
        onBooksImport(data);
      });
    }
  };

  return (
    <>
    <div className='import'>
      <div>
      <p>Export books collection</p>
      <button onClick={handleExportJSON}>Export as JSON</button>
      <button onClick={handleExportCSV} sty>Export as CSV</button>
      </div>
      <p>Import .csv file</p>
      <input type="file" accept=".csv" onChange={handleImportCSV} />
      </div>
    
    </>
  );
}

export default ImportExport;
