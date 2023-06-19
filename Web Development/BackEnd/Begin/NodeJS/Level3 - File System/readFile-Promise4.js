// Shorter way of writing readFile-Promise3.js

const {readFile, writeFile} = require('fs').promises

const start = async() => {
    try{
        const first = await readFile('textFile.txt', 'utf8')
        const second = await readFile('textFile2.txt', 'utf8')
        await writeFile('writeFile1.txt', `This is good ${first} ${second}`)
        console.log(first)
        console.log(second)
    }
    catch(error){
        console.log(error)
    }
}
start()