create table giraffe.student1(Student_ID int,name varchar(30),fathername varchar(30),
mothername varchar(30),dob date);

select * from giraffe.student1;

insert into giraffe.student1 values(9,'Sarthak','Devavrata','Shuvomita','2000-1-21');

select * from giraffe.student as s inner join giraffe.student1 as s1 on s.name=s1.name;
select s.Hobby,s.name,s1.fathername,s1.mothername from giraffe.student as s inner join
giraffe.student1 as s1 on s.Student_ID=s1.Student_ID;