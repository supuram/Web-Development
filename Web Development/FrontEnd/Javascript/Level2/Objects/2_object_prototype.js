const myObject = {
    city: "Madrid",
    greet() {
      console.log(`Greetings from ${this.city}`);
    }
};
  
const properties = Object.getOwnPropertyNames(Object.getPrototypeOf(myObject));
  
console.log(properties);  