function talk(){
    console.log(this)
}

const me = {
    a:"20",
    b:"Ishita"
}
talk.call(me) // me now becomes the this object. this = me{}