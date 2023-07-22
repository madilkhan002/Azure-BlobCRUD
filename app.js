require('dotenv').config();
const app  = require("express")();
const fs = require('fs');
const { BlobServiceClient } = require('@azure/storage-blob');

const AZURE_STORAGE_CONNECTION_STRING =  process.env.AZURE_CONNECTION;

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

// Replace 'your_container_name' with the desired container name
const containerName = 'study';


// Create New Container
async function createContainerIfNotExists() {

    try {
        // Get a reference to the container
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Check if the container already exists
        const containerExists = await containerClient.exists();

        if (containerExists) {
        console.log(`Container "${containerName}" already exists.`);
        } else {
        // Create the container if it does not exist
        const createContainerResponse = await containerClient.create();
        console.log(`Container "${containerName}" created successfully.`);
        }
    } catch (error) {
        console.error(`Error creating container "${containerName}":`, error.message);
    }
}

//   createContainerIfNotExists();


// Upload any file
async function uploadFile() {
    const fileName = 'os-notes.pdf'; // fileName can be any
    const filePath = '/home/adil/Desktop/Extra/os-notes.pdf';
    try {
        // Get a reference to the container
        const containerClient = blobServiceClient.getContainerClient('study');

        // Create a block blob client with the file name
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);

        // Check if the blob already exists
        const blobExists = await blockBlobClient.exists();

        if (blobExists) {
            console.log(`File "${fileName}" already exists. Skipping upload.`);
        } else {
            // Read the Word file content
            const fileContent = fs.readFileSync(filePath);

            // Upload the file to Azure Blob Storage
            const uploadResponse = await blockBlobClient.upload(fileContent, fileContent.length);
            console.log(`File "${fileName}" uploaded successfully.`);
            console.log(`Blob URL: ${blockBlobClient.url}`);
        }
    } catch (error) {
        console.error('Error uploading file:', error.message);
    }
}

//   uploadFile()





async function deleteFile() {
    const fileName = 'os-notes.pdf'; // Replace with the name of the file you want to delete

    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Create a block blob client with the file name
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    try {
    // Check if the file exists
    const exists = await blockBlobClient.exists();

    if (exists) {
        // Delete the file from Azure Blob Storage
        await blockBlobClient.delete();
        console.log(`File "${fileName}" deleted successfully.`);
    } else {
        console.log(`File "${fileName}" does not exist.`);
    }
    } catch (error) {
    console.error('Error deleting file:', error.message);
    }
}

// deleteFile();

// Download File
async function downloadFile() {
    const fileName = 'OS.pdf'; // Replace with the name of the file you want to download
    const downloadFilePath = '/home/adil/Downloads/';
  
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // Create a block blob client with the file name
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  
    try {
      // Download the file from Azure Blob Storage
      const downloadResponse = await blockBlobClient.download();
  
      // Create a writeable stream to save the downloaded content
      const writeStream = fs.createWriteStream(downloadFilePath + fileName);
  
      // Pipe the download response data to the writeable stream
      downloadResponse.readableStreamBody.pipe(writeStream);
  
      // Listen for the 'finish' event to know when the download is completed
      writeStream.on('finish', () => {
        console.log(`File "${fileName}" downloaded successfully.`);
        console.log('Download completed.');
      });
  
      // Listen for the 'error' event to handle any errors that may occur during the download
      writeStream.on('error', (error) => {
        console.error('Error downloading file:', error.message);
      });
    } catch (error) {
      console.error('Error downloading file:', error.message);
    }
  }
  
//   downloadFile();
  



// Update file
async function updateFile() {
    const fileName = 'OS.pdf'; // fileName can be any
    const filePath = '/home/adil/Desktop/Extra/os-notes.pdf';
    try {
        // Get a reference to the container
        const containerClient = blobServiceClient.getContainerClient('study');

        // Create a block blob client with the file name
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);

        // Check if the blob already exists
        const blobExists = await blockBlobClient.exists();

        if (blobExists) {
            // console.log('File Deleted Successfully.');
            await blockBlobClient.delete();
        }
        // Read the Word file content
        const fileContent = fs.readFileSync(filePath);

        // Upload the file to Azure Blob Storage
        const uploadResponse = await blockBlobClient.upload(fileContent, fileContent.length);
        console.log(`File "${fileName}" uploaded successfully.`);
        console.log(`Blob URL: ${blockBlobClient.url}`);
    } catch (error) {
        console.error('Error uploading file:', error.message);
    }
}

updateFile()