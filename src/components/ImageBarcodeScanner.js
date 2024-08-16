import React, { useState } from 'react';
import Quagga from 'quagga';

function ImageBarcodeScanner({isbn, setIsbn}) {
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setError('');
  };

  const handleScan = () => {
    if (!file) {
      setError('Please select an image file containing the barcode.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;

      Quagga.decodeSingle({
        src: dataUrl,
        numOfWorkers: 1, 
        inputStream: {
          size: 800  
        },
        decoder: {
          readers: ['ean_reader', 'upc_reader', 'code_128_reader'], 
          debug: {
            drawBoundingBox: true, 
            showFrequency: true, 
            drawScanline: true, 
          }
        },
        locate: true, 
        locator: {
          halfSample: false, 
          patchSize: 'large', 
        },
      }, (result) => {
        if (result && result.codeResult) {
          setIsbn(result.codeResult.code);
          setError('');
        } else {
          setError('No barcode found in the image.');
        }
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='image-barcode-scanner'>
      <h2>Barcode Scanner</h2>
      <p>Choose image to upload</p>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleScan}>Scan ISBN</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isbn && <p> ISBN scanned successfully!</p>}
    </div>
  );
}

export default ImageBarcodeScanner;
