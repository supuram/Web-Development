const a = require('lodash')
const items = [1,[2,[3,[4,[5]]]]]
const newItems = a.flattenDeep(items)
console.log(newItems)
console.log('hello world')

/* If you type npm start in the VS Code terminal this will run as you entered "start": "node nodemon.js" inside
scripts in package.json file */