function myFunction() {
    console.log(this);
}
  
myFunction(); // logs the global object in non-strict mode, undefined in strict mode