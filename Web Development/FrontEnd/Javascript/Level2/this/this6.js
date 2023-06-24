function myStrictFunction() {
    "use strict";
    console.log(this);
}
  
myStrictFunction(); // logs undefined in strict mode