function Car(color) {
    if (!new.target) {
      // Called as function.
      return `${color} car`;
    }
    // Called with new.
    this.color = color;
}
  
const a = Car("red")
const b = new Car("red")

console.log(a)
console.log(b)
console.log(a.color)
console.log(b.color)