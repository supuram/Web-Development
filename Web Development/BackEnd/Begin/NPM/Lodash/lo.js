const a = require('lodash')
const items = [1,[2,[3,[4,[5]]]]]
const newItems = a.flattenDeep(items)
console.log(newItems)