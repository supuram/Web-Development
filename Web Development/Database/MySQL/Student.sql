CREATE TABLE IF NOT EXISTS giraffe.student(Student_ID INT, name VARCHAR(40), major VARCHAR(20));

SELECT * FROM giraffe.student;

ALTER TABLE giraffe.student ADD GPA DECIMAL(3,2) AFTER major;
ALTER TABLE giraffe.student ADD Hobby VARCHAR(15) AFTER GPA;

INSERT INTO giraffe.student VALUES (1,'Anjana','Chemistry',9.23,'Football');

SELECT DISTINCT name FROM giraffe.student;

select count(name) from giraffe.student;
select sum(Student_ID) from giraffe.student;
select name,GPA from giraffe.student;
select * from giraffe.student where GPA > 8.00;
select name,GPA from giraffe.student where Student_Id >3;
select Hobby, GPA, name from giraffe.student where name in ('Anjana', 'Raja');
select * from giraffe.student where GPA between 8 and 9;
select * from giraffe.student where Student_ID >2 and GPA > 7;
select Hobby,sum(GPA) from giraffe.student group by Hobby;
select * from giraffe.student ORDER BY GPA desc;
select Hobby,length(Hobby) from giraffe.student;
select Hobby,count(Hobby) from giraffe.student group by Hobby having count(Hobby) > 1;
select * from giraffe.student having GPA > 9;

select length('Pranitajol');
select character_length('kk');
select repeat('v',9);
select upper('qwerty');
select concat('a',' for ','apple');
select reverse('pole');
select replace('I am a good boy','good','very good');

update giraffe.student set Hobby='Cricket' where Student_Id=1;
update giraffe.student set GPA=8.47 where Student_Id=1;
update giraffe.student set Hobby='Football' where Student_Id=2;
update giraffe.student set Hobby='Badminton' where Student_Id=3;
update giraffe.student set Hobby='Tennis' where Student_Id=4;

delete from giraffe.student where Student_ID=1;