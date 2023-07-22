# Azure-BlobCRUD
* 1- Clone the repository: First, clone the GitHub repository to your local machine using the following command:

``` 
git clone https://github.com/madilkhan002/AzureBlob-CRUD.git
 ```
* 2- Install dependencies: Navigate to the project directory and install the required dependencies using npm.

```
cd AzureBlob-CRUD
npm install
```
* 3- Set up Azure Blob Storage: Before running the application, you need to create an Azure Blob Storage account and obtain the connection string. You can do this through the Azure Portal or Azure CLI. Once you have the connection string, create a .env file in the root of the project directory and add the connection string to it.

```
AZURE_CONNECTION=<YOUR_AZURE_BLOB_STORAGE_CONNECTION_STRING>
```
* 4- Uncomment the function you want to run: The app.js file contains multiple functions to perform various operations like creating a container, uploading, downloading, deleting, and updating files. Uncomment the function you want to run.

For example, if you want to upload a file, uncomment the uploadFile() function:
```
// Uncomment the function you want to run
// uploadFile();
// deleteFile();
// downloadFile();
// updateFile();
```
* 5- Run the application: Save the changes in app.js, and then run the application using the following command:
```
node app.js
```
* 6- Check the console: Depending on the function you've uncommented, the application will perform the corresponding operation and display the results in the console.
