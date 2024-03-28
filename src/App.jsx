import React, { useState } from 'react'
import axios from 'axios';

const App = () => {
  const [scannedData, setScannedData] = useState('');

  const handleScan = async () => {
    try {
      if ('NDEFReader' in window) {
        const ndef = new NDEFReader();

        ndef.addEventListener('reading', event => {
          const scanData = event.message.records[0].data;
          setScannedData(scanData);

          // axios.post('/api/nfc', {data: scannedData})
          // .then(res => {
          //   console.log(res.data);
          // })
          // .catch(error => {
          //   console.error(error);
          // })
        });

        // Start reading NFC
        await ndef.scan();
        alert(scanData)
      } else {
        console.log('NFC not supported on this device');
      }

    } catch(err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>NFC Scanner</h1>
      <button onClick={handleScan}>Scan NFC</button>
      <p>Scanned Data: {scannedData}</p>
    </>
  )
}

export default App