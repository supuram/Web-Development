function Person(){
    console.log(this)
}

const me = new Person()  // this = me{}