const fs = require("fs");

fs.readFile("fs-readFile.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
});

// The format of fs.readFile(path[, options], callback)