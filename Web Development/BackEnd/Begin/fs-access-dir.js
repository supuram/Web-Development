const fs = require("fs");
const path = require("path");

const dirPath = path.dirname("fs-writeFile.txt");

fs.access(dirPath, fs.constants.W_OK, (err) => {
  if (err) {
    console.log("The directory is not writable");
  } else {
    console.log("The directory is writable");
  }
});

/*
You can check if the Node.js process has permission to write to the specified file or directory by using the 
fs.access method. This method tests the user’s permissions for the file or directory specified by the given path.
This code checks if the directory containing the file fs-writeFile.txt is writable by the current user. If an 
error occurs, it means that the directory is not writable and an error message is logged to the console. 
Otherwise, a success message is logged to indicate that the directory is writable.
*/