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

class Student extends Person {
    #year;  /* private data property */ 
  
    constructor(name, year) {
      super(name);
      this.#year = year;
    }
  
    introduceSelf() {
      console.log(`Hi! I'm ${this.name}, and I'm in year ${this.#year}.`);
    }
  
    canStudyArchery() {
      return this.#year > 1;
    }

    onlyYear(){
        return this.#year
    }

    onlyYear1(){
        console.log(this.#year)
    }
}
const a = new Student('Ishita', '1992')
a.introduceSelf()
console.log(a.canStudyArchery())
console.log(a.onlyYear())
a.onlyYear1()