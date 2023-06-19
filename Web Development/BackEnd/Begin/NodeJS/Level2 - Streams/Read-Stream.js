const {createReadStream} = require('fs')
const stream = createReadStream('writeFileSync.txt', {
    highWaterMark: 90000
})
stream.on('data', (result) => {
    console.log(result)
})
stream.on('error', (err) => {
    console.log(err)
})

/*
The highWaterMark option specifies the maximum number of bytes to store in the internal buffer before ceasing to 
read from the underlying resource. In your case, you have set the highWaterMark to 90000 bytes. This means that 
each chunk of data read from the file will be at most 90000 bytes in size. The 89950 more bytes indicates that the 
Buffer object contains more data than what is being displayed and its actual size is close to the highWaterMark 
value.

The last line contains 58730 more bytes because it represents the last chunk of data read from the file. Since it 
is the last chunk, its size may be smaller than the highWaterMark value if there are fewer bytes remaining in the 
file to be read.
*/