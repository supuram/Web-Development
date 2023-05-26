create table giraffe.student2(Student_ID int,name varchar(30),pocket_money int,state varchar(20));

select * from giraffe.student2;


create trigger giraffe.abc
before insert on giraffe.student2 
for each row 
if new.pocket_money > 5000
then set new.pocket_money = 5000; 
end if; 


insert into giraffe.student2 values(8,'Abhimanyu',12000,'Gujarat');

select s.name,sum(s.GPA) from giraffe.student as s inner join giraffe.student1 as s1 on s.name=s1.name
inner join giraffe.student2 as s2 on s1.Student_ID=s2.Student_ID group by s.major;

select s.Student_ID,s.name,s2.state from giraffe.student as s 
left join giraffe.student2 as s2 on s.name=s2.name;

select s1.Student_ID,s1.name,s2.state from giraffe.student1 as s1 
left join giraffe.student2 as s2 on s1.name=s2.name;

select s.Student_ID,s.name,s2.state from giraffe.student2 as s2 
left join giraffe.student as s on s.name=s2.name;

select s.Student_ID,s.name,s2.state from giraffe.student2 as s2 
right join giraffe.student as s on s.name=s2.name;

select s.Student_ID,s.name,s2.state from giraffe.student2 as s2 
left join giraffe.student as s on s.name=s2.name
union
select s.Student_ID,s.name,s2.state from giraffe.student2 as s2 
right join giraffe.student as s on s.name=s2.name;
