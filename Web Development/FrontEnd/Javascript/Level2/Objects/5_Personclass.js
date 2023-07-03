class Person {
    name;
    constructor(name) {
        this.name = name;
    }
  
    introduceSelf() {
        console.log(`Hi! I'm ${this.name}`);
    }
}
const giles = new Person("Giles");
giles.introduceSelf(); // Hi! I'm Giles

class Professor extends Person {
    teaches;
  
    constructor(name, teaches) {
      super(name);
      this.teaches = teaches;
    }
  
    introduceSelf() {
      console.log(
        `My name is ${this.name}, and I will be your ${this.teaches} professor.`
      );
    }
  
    grade(paper) {
      return paper
    }
}  
const a = new Professor('Supratik', 'Computer Science')
a.introduceSelf()
console.log(a.grade('A'))