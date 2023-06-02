const num = [43,89,100,12,34]
let len = num.length
for(let i = 0; i < len; i++){
    console.log(num[i])
}

num.forEach((element, index, array)=>{
    console.log(element * element, index, array)
})