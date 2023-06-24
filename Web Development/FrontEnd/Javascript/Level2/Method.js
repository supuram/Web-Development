function BellBoy(name, age, languages){
    this.name = name
    this.age = age 
    this.languages = languages
    this.moveSuitCase = function(){
        alert("May I take your suitcase")
        pickUpSuitCase()
        move()
    }
}

let bellboy1 = new BellBoy('Atanu', 28, ['English', 'Bengali'])
bellboy1.moveSuitCase()