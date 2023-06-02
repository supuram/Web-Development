function compare(a,b){
    return a - b
}
let  num = [35,21,98]
num.sort(compare)
console.log(num)
console.log(num.reverse())

/*
In this example, we have an array with three elements: [35, 21, 98]. When we call the sort method and 
pass in the compare function as an argument, the following happens:

The sort method calls the compare function with the first pair of elements: (35, 21).
The compare function calculates 35 - 21, which is equal to 14.
Since 14 is greater than 0, element 21 comes before element 35.
The array now looks like this: [21, 35, 98].
The sort method calls the compare function with the next pair of elements: (35, 98).
The compare function calculates 35 - 98, which is equal to -63.
Since -63 is less than 0, element 35 comes before element 98.
The array now looks like this: [21, 35, 98].
The sort method has finished sorting the array.

In JavaScript, functions are first-class objects. This means that they can be treated like any other 
object and can be passed as arguments to other functions. In the code you provided, the compare function
is being passed as an argument to the sort method of the num array. The sort method uses the compare 
function to determine the order of elements in the array.

The compare function takes two arguments, a and b, and returns a value that determines their order. If 
the returned value is less than 0, a comes before b. If the returned value is greater than 0, b comes 
before a. If the returned value is 0, their order doesn’t change.

In this case, the compare function returns the result of subtracting b from a. This means that if a is
less than b, the returned value will be negative and a will come before b. If a is greater than b, the 
returned value will be positive and b will come before a. This results in the array being sorted in 
ascending order.

After calling the sort method with the compare function as an argument, the array is sorted and then 
logged to the console. The output should be [6, 21, 35, 43, 98, 677, 1003].

The behavior of the sort method when a compare function is passed as an argument is defined by the 
JavaScript language specification. According to the specification, if the compare function returns a 
value less than 0, the first element (a) should come before the second element (b). If the compare 
function returns a value greater than 0, the second element (b) should come before the first element (a).
If the compare function returns 0, the order of the two elements doesn’t change.

In other words, it is the JavaScript language itself that defines this behavior. When you call the sort
method and pass in a compare function as an argument, the sort method follows these rules to determine 
the order of elements in the array.

In your example, when the compare function is called with the arguments (35, 21) and returns 14 (which is
greater than 0), the sort method determines that element 21 should come before element 35 according to 
these rules.

The behavior of the sort method is defined in the ECMAScript Language Specification. The specification
is a document that defines the standard for the JavaScript language. You can find the latest version of 
the specification on the ECMA International website.
*/