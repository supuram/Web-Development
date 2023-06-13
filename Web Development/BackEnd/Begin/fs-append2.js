const fs = require("fs");

const data2 = "Data from fs-append2.js";

fs.appendFile("fs-append.txt", data2, (err) => {
  if (err) throw err;
  console.log("Data from file2.js has been appended to the output file!");
});
