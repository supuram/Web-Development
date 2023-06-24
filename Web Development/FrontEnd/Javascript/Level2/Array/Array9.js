const num = [43,89,100,12,34]
let len = num.length
for(let i = 0; i < len; i++){
    process.stdout.write(num[i].toString()+" ")
}

num.forEach((a)=>{
    process.stdout.write((a*a).toString()+" ")
})

/* process.stdout.write method expects a string as an argument. So toString method is used to convert the 
numbers to strings before passing them to the process.stdout.write method. */