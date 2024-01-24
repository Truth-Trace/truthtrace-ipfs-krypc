import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const IPFSQRCode = ({ ipfsLink }) => {
  const [qrValue, setQRValue] = useState(ipfsLink);

  const handleChange = (event) => {
    setQRValue(event.target.value);
  };

  return (
    <div className='w-1/4 rounded-md bg-slate-200 p-2'>
      <h1 className='text-xl font-medium p-2'>IPFS QR Code Generator</h1>
      <label className='block text-sm font-medium text-gray-700'>
        IPFS Link:
        <input
          type="text"
          value={qrValue}
          onChange={handleChange}
          className='mt-1 p-2 border rounded-md'
        />
      </label>
      <br />
      <QRCode value={qrValue} />
    </div>
  );
};

export default IPFSQRCode;
