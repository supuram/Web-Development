const square = function(number){
    return number * number
}

console.log(square(6))

const factorial = (number) => {
    return number < 2 ? 1 : number * factorial(number - 1)
}

console.log(factorial(6))