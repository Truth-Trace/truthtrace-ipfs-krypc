// StorageManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StorageManager = () => {
  const instanceId = 'INS_ST_142_2024122'; // Your provided instance ID

  const [ipfsHashInput, setIpfsHashInput] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the file associated with the input IPFS hash from IPFS
    const fetchFileByIpfsHash = async () => {
      try {
        if (ipfsHashInput) {
          const response = await axios.get(
            `https://ipfs-gateway.node.krypcore.io/api/v0/ipfs/${ipfsHashInput}`
          );

          // Update the file state with the retrieved file
          setFile(response.data);
        } else {
          setFile(null);
        }
      } catch (error) {
        console.error('Error fetching file from IPFS:', error);
        setError('Error fetching file. Please check the IPFS hash and try again.');
        setFile(null);
      }
    };

    fetchFileByIpfsHash();
  }, [ipfsHashInput]);

  const handleIpfsHashChange = (event) => {
    setIpfsHashInput(event.target.value);
  };

  const deleteFileFromIPFS = async () => {
    try {
      // Implement the logic to delete the file from IPFS

      // Clear the file state after deletion
      setFile(null);
      setIpfsHashInput('');
    } catch (error) {
      console.error('Error deleting file from IPFS:', error);
      setError('Error deleting file. Please try again.');
    }
  };

  return (
    <div className='w-1/4 rounded-md bg-slate-200 p-6'>
      <h1 className='text-2xl font-medium text-black'>Storage Manager</h1>
      <label>
        IPFS Hash:
        <input type="text" value={ipfsHashInput} onChange={handleIpfsHashChange} className='mx-1 py-2 my-2 shadow appearance-none border rounded w-1/2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
      </label>
      <br />
      <button onClick={() => setIpfsHashInput('')} className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>Clear Input</button>
      <br />
      {ipfsHashInput && (
        <>
          <h2>File Details:</h2>
          {file ? (
            <div>
              <p>Name: {file.name}</p>
              <p>IPFS Hash: {ipfsHashInput}</p>
              {/* Add more file details as needed */}
              <button onClick={deleteFileFromIPFS}>Delete from IPFS</button>
            </div>
          ) : (
            <p>Loading file details...</p>
          )}
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default StorageManager;
