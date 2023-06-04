function HouseKeeper(exp, name, cleaning){
    this.exp = exp
    this.name = name
    this.cleaning = cleaning
}

let houseKeeper1 = new HouseKeeper(9, 'Tanmoy', ["Bathroom","Bedroom"])
console.log(houseKeeper1.name)

/* this.exp refers to the exp property of the object being created, while exp refers to the value passed as
the first argument to the HouseKeeper function.

After defining the HouseKeeper function, the code creates a new HouseKeeper object using the new keyword and
assigns it to the houseKeeper1 variable:
let houseKeeper1 = new HouseKeeper(9, 'Tanmoy', ["Bathroom","Bedroom"]);
This line creates a new HouseKeeper object with an exp property of 9, a name property of 'Tanmoy', and a 
cleaning property of ["Bathroom","Bedroom"].
*/