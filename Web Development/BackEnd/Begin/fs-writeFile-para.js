const fs = require("fs");
const para = `When I first saw her I was mad for her
Her eyes were like a fearful dear
Her feet were milky white
Her smile was as if Goddess Parvati emerged 
She was a true embodiment of a Goddess
But alas I lost her
She was gone forever`

fs.writeFile("fs-writeFile-para.txt", para,(err) => {
  if (err) throw err
  console.log("The file has been saved!");
});