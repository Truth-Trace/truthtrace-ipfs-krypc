// FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFileToIPFS = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        'https://ipfs-client.node.krypcore.io/api/v0/ipfs/afd2d7f0-043b-4c8b-b437-b2edb3cabb61/api/v0/add?recursive=false&pin=true',
        formData,
        {
          headers: {
            Authorization: 'da187368-074e-411e-a74e-7a8654954d06', // Replace with your actual authorization token
          },
        }
      );

      setIpfsHash(response.data.Hash);
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
    }
  };

  const retrieveFileFromIPFS = async () => {
    try {
      const response = await axios.get(
        `https://ipfs-gateway.node.krypcore.io/api/v0/ipfs/${ipfsHash}`
      );

      // Handle the retrieved file as needed, for example, display it in an <img> tag
      console.log('Retrieved file data:', response.data);
    } catch (error) {
      console.error('Error retrieving file from IPFS:', error);
    }
  };

  return (
    <div className='w-1/4 rounded-md bg-slate-200 p-2'>
      <h1 className='text-xl font-medium p-2'>IPFS File Upload and Retrieval</h1>
      <input type="file" onChange={handleFileChange} className='my-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' />
      <button onClick={uploadFileToIPFS} className='my-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>Upload to IPFS</button>
      {ipfsHash && ( 
        <div>
          <p className='text-sm'>IPFS Hash: {ipfsHash}</p>
          <button onClick={retrieveFileFromIPFS} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow my-1'>Retrieve from IPFS</button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
