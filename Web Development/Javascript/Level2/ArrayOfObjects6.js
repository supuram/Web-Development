let obj = [];
let numberOfEntries = 5;

for (let i = 0; i < numberOfEntries; i++) {
    obj.push({
        Student_name: "",
        Roll_Number: null,
        Total_Marks: null
    });
}

const a = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(i) 
{
    if (i < 5) {
        a.question(`Enter your ${(i+1)}th name = `, name1 => {
            obj[i].Student_name = name1; 
            a.question(`Enter  your ${(i+1)}th roll = `, roll => {
                obj[i].Roll_Number = parseInt(roll);
                a.question(`Enter  your ${(i+1)}th marks = `, marks => {
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