let obj = {
    Student_name : [],
    Roll_Number : [],
    Total_Marks : []
}
obj.Student_name[0] = "Ishita"
obj.Roll_Number[0] = 1
obj.Total_Marks[0] = 500
console.log(obj)

const a = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(i) 
{
    if (i < 5) {
        a.question(`Enter your ${(i+1)}th name = `, name1 => {
            obj.Student_name[i] = name1; 
            a.question(`Enter  your ${(i+1)}th roll = `, roll => {
                obj.Roll_Number[i] = parseInt(roll);
                a.question(`Enter  your ${(i+1)}th marks = `, marks => {
                    obj.Total_Marks[i] = parseInt(marks);
                    askQuestion(i + 1);
                });
            });
      });
    } 
    else {
      a.close();
      console.log(obj, obj.Roll_Number.length)
    }
}
askQuestion(1);