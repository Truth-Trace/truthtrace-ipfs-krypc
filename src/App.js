// App.js
import React from 'react';
import StorageManager from './StorageManager';
import FileUpload from './FileUpload';
import IPFSQRCode from './IPFSQRCode';

function App() {
  // // Use the provided instance ID
  // const instanceId = 'INS_ST_142_2024122';
  
  const ipfsLink = 'https://ipfs-gateway.node.krypcore.io/api/v0/ipfs/afd2d7f0-043b-4c8b-b437-b2edb3cabb61/ipfs/';

  return (
    <div className="App flex items-center justify-center gap-6 my-10">
      <FileUpload />
      <StorageManager />
      <h1>IPFS QR Code</h1>
      <IPFSQRCode ipfsLink={ipfsLink} />


    </div>
  );
}

export default App;
