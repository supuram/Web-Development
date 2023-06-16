const fs = require("fs");

fs.writeFile("fs-writeFile.txt", "I am excited to learn about Backend",(err) => {
  if (err) throw err
  console.log("The file has been saved!");
});

/*
The format of fs.writeFile(file, data[, options], callback)
Here , file is fs-writeFile.txt,
data is Hello Node,
and callback is error
*/