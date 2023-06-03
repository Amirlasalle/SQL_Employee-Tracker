USE employerTracker_db;


SELECT d.id,d.name,r.id,,r.title,r.salary
from department d,roles r where r.department_id = d.id;


select * from department;

select * from roles;

select * from employee;