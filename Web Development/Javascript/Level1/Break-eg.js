let i = 0
while (i<5){
    for(let j = 0; j < 7; j++)
    {
        if(j == 3 || j == 5){
            break
        }
        else{
            process.stdout.write(j.toString())
        }
    }
    i++
    console.log()
}