USE employerTracker_db;

INSERT INTO department(name) VALUES
('Sales'),
('Marketing'),
('IT');

INSERT INTO ROLES (title, salary, department_id)
VALUES ('Manager of Sales',219471,1),
('Manager of IT',99999,3),
('Manager of Marketing', 198634,2),
('inside sales-egnineer', 70000,1),
('IT employee', 120000, 3),
('Marketing executive', 75000,2);

INSERT INTO EMPLOYEE (first_name, last_name, ROLE_ID,manager_id)
VALUES ("Elliot", "Smith",1,null ),
       ("Amira", "Afzal",3,null),
       ("Amir","Mohamed",2,null),
       ("Christoper", "Lee",4, 1),
       ("Verónica", "Rodriguez",5, 3),
       ("Igor", "Stein", 6,2);
       
  