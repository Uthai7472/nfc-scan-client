import React, { useState, useEffect } from 'react'
import axios from 'axios';

const App = () => {
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    const handleScan = async () => {
      try {
        if ('NDEFReader' in window) {
          const ndef = new NDEFReader();

          ndef.addEventListener('reading', event => {
            const scanData = event.message.records[0].data;
            setScannedData(scanData);
          });

          await ndef.scan();
        } else {
          console.log('NFC not supported on this device');
        }
      } catch (err) {
        console.log(err);
      }
    };

    handleScan();

    return () => {
      if ('NDEFReader' in window) {
        const ndef = new NDEFReader();
        ndef.removeEventListener('reading');
      }
    };
  }, []);

  return (
    <>
      <h1>NFC Scanner</h1>
      {/* <button onClick={handleScan}>Scan NFC</button> */}
      <p>Scanned Data: {scannedData}</p>
    </>
  )
}

export default App