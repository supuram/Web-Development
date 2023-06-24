const num = [23,45,37,89,12,5]
num.splice(2,3,79,456,983)
console.log(num)

/*
num.splice(2,3,79,456,983) means from the index2 position of the array remove next 3 elements including the 
element in the index2 position. Number in the index2 position is 37. So 37,89,12 will be removed and 79,456,
983 will be added. Splice modifies the array
*/