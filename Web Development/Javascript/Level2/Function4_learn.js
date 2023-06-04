function sum(num1, num2){
    return num1 + num2
}

function multiply(num1, num2){
    return num1 * num2
}

function calculator(num1, num2, operate){
    return operate(num1, num2)
}

console.log(calculator(33, 21, multiply))

// Functions that can take other functions as input are called higher order functions