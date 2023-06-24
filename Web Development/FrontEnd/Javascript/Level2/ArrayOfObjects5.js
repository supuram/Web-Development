let obj = [{
    Student_name : " ",
    Roll_Number : null,
    Total_Marks : null
}]
obj[0].Student_name = "Ishita"
obj[0].Roll_Number = 1
obj[0].Total_Marks = 500
console.log(obj)

const a = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(i) 
{
    if (i < 5) {
        a.question(`Enter your ${(i+1)}th name = `, name1 => {
            obj[i].Student_name = name1; 
            a.question('Enter  your ${(i+1)}th roll = ', roll => {
                obj[i].Roll_Number = parseInt(roll);
                a.question('Enter  your ${(i+1)}th marks = ', marks => {
                    obj[i].Total_Marks = parseInt(marks);
                    askQuestion(i + 1);
                });
            });
      });
    } 
    else {
      a.close();
      console.log(obj)
    }
}
askQuestion(0);

/* This code will not take 5 entries as intended. So to solve this issue we go to ArrayOfObjects6.js code
To make this run you have to write,
let obj = [{
    Student_name : " ",
    Roll_Number : null,
    Total_Marks : null
},
{
    Student_name : " ",
    Roll_Number : null,
    Total_Marks : null
},
{
    Student_name : " ",
    Roll_Number : null,
    Total_Marks : null
},
{
    Student_name : " ",
    Roll_Number : null,
    Total_Marks : null
},
{
    Student_name : " ",
    Roll_Number : null,
    Total_Marks : null
}]
*/