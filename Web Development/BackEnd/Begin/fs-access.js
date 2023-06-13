const fs = require("fs");

fs.access("fs-writeFile.txt", fs.constants.W_OK, (err) => {
  if (err) {
    console.log("The file is not writable");
  } else {
    console.log("The file is writable");
  }
});

/*
You can use the fs.access method to check if the Node.js process has the proper permissions to read, write, or 
execute a file. This method tests the user’s permissions for the file or directory specified by the given path. 
The mode argument is an optional integer that specifies the accessibility checks to be performed. The possible 
values for mode include fs.constants.F_OK (check if the file exists), fs.constants.R_OK (check if the file is 
readable), fs.constants.W_OK (check if the file is writable), and fs.constants.X_OK (check if the file is 
executable)
*/