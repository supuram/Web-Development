const myObject = {
    a:"20",
    myMethod: function() {
        console.log(this);
    }
};
  
myObject.myMethod(); // logs myObject