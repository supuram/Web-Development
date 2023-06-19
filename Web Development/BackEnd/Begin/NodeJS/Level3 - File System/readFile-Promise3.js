// Shorter way of writing readFile-Promise2.js

const {readFile, writeFile} = require('fs')
const util = require('util')
const readFilePromise = util.promisify(readFile)
const writeFilePromise = util.promisify(writeFile)

const start = async() => {
    try{
        const first = await readFilePromise('textFile.txt', 'utf8')
        const second = await readFilePromise('textFile2.txt', 'utf8')
        await writeFilePromise('writeFile.txt', `This is good ${first} ${second}`)
        console.log(first)
        console.log(second)
    }
    catch(error){
        console.log(error)
    }
}
start()