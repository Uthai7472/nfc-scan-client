import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';

function App() {
  const [nfcValue, setNfcValue] = useState('');

  useEffect(() => {
    // Check if the Web NFC API is supported by the browser
    if ('NDEFReader' in window) {
      // Request permission to access NFC
      navigator.permissions.query({ name: 'nfc' })
        .then((permissionStatus) => {
          if (permissionStatus.state === 'granted') {
            // Create an instance of the NDEFReader
            const nfcReader = new NDEFReader();

            // Add event listener for reading NFC tags
            nfcReader.addEventListener('reading', ({ message }) => {
              // Extract the NFC value from the message
              const value = message.records[0].data;

              // Update the state with the NFC value
              setNfcValue(value);

              // Save the NFC value to a .txt file
              const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
              saveAs(blob, 'nfc_value.txt');
            });

            // Start reading NFC tags
            nfcReader.scan();
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.error('Web NFC API is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      <h1>NFC Reader</h1>
      <p>NFC Value: {nfcValue}</p>
    </div>
  );
}

export default App;