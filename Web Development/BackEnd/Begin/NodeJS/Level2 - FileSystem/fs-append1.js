const fs = require("fs");

const data1 = "Data from fs-append1.js";

fs.appendFile("fs-append.txt", data1, (err) => {
  if (err) throw err;
  console.log("Data from file1.js has been appended to the output file!");
});
