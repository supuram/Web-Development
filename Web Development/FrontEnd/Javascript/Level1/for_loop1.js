let marks = {
    Abhinava : 72,
    Ishita : 89,
    Sushmita : 96,
    Priyajit : 67
}

for (let i = 0; i < Object.keys(marks).length; i++){
    console.log("The marks of", Object.keys(marks)[i],"is",marks[Object.keys(marks)[i]])
}

console.log(Object.keys(marks))