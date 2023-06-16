const inquirer = require("inquirer")
const mysql = require("mysql2")
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "employerTracker_db"
})
require("console.table")
db.commit(function (error) {
    if (error) throw error;
    console.log("Welcome to ET")
    startEmpTracker()
})

function startEmpTracker() {
    inquirer.prompt([
        {
            type: "list",
            message: "who will you like to track",
            name: "options",
            choices: ["View department", "View roles", "View employees", "Add department", "Add roles", "Add employees", "Update employee roles", "exit application"]
        }
    ]).then(response => {
        switch (response.options) {
            case "View department":
                view_department()
                break;
            case "View roles":
                view_roles()
                break;
            case "View employees":
                view_employees()
                break;
            case "Add department":
                add_department()
                break;
            case "Add roles":
                add_roles()
                break;
            case "Add employees":
                add_employees()
                break;
            case "Update employee roles":
                updateEmployee_roles()
                break;
            default:
                db.end()
                process.exit(0)
        }
    })
}


function view_department() {
    db.query("select * from department;", function (err, data) {
        if (err) throw err;
        console.table(data)
        startEmpTracker()
    })
}

function view_roles() {
    db.query("select * from roles;", function (err, data) {
        if (err) throw err;
        console.table(data)
        startEmpTracker()
    })
}

function view_employees() {
    db.query("select * from employee;", function (err, data) {
        if (err) throw err;
        console.table(data)
        startEmpTracker()
    })
}
function add_department() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter department name: ",
            name: "dname"
        }
    ]).then(({ dname }) => {

        db.query("INSERT INTO department(name) VALUES (?);", dname, function (err, data) {
            if (err) throw err;
            console.table(data)
            startEmpTracker()
        })
    })
}
function add_roles() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter role title: ",
            name: "title"
        },
        {
            type: "input",
            message: "Enter role salary: ",
            name: "salary"
        },
        {
            type: "list",
            message: "Select the department id: ",
            name: "department_id",
            choices: [
                {
                    name: "Sales",
                    value: 1
                },
                {
                    name: "Marketing",
                    value: 2
                },
                {
                    name: "IT",
                    value: 3
                }
            ]

        },

    ]).then(({ title, salary, department_id }) => {
        db.query("INSERT INTO ROLES (title, salary, department_id) VALUES(?,?,?);", [title, salary, department_id], function (err, data) {
            if (err) throw err;
            console.table(data)
            startEmpTracker()
        })
    })
}
function add_employees() {
    inquirer.prompt([
        {
            type: "input",
            message: "enter first name: ",

            name: "first_name"
        },
        {
            type: "input",
            message: "Enter last name: ",
            name: "last_name"
        },
        {
            type: "list",
            message: "Select the ROLE_id: ",
            name: "ROLE_id",
            choices: [
                {
                    name: "Manager of Sales",
                    value: 1
                },
                {
                    name: "Manager of Marketing",
                    value: 2
                },
                {
                    name: "Manager of IT",
                    value: 3
                },
                {
                    name: "inside sales-engineer",
                    value: 4
                },
                {
                    name: "Marketing executive",
                    value: 5
                },
                {
                    name: "IT employee",
                    value: 6
                }
            ]

        },
        {
            type: "list",
            message: "Select the manager: ",
            name: "manager_id",
            choices: [
                {
                    name: "Eliot Smith",
                    value: 1
                },
                {
                    name: "Amira Afzal",
                    value: 2
                },
                {
                    name: "Amir Mohamed",
                    value: 3
                }
            ]

        },

    ]).then(({ first_name, last_name, ROLE_id, manager_id }) => {
        db.query("INSERT INTO EMPLOYEE (first_name, last_name, ROLE_ID,manager_id) VALUES(?,?,?,?);", [first_name, last_name, ROLE_id, manager_id], function (err, data) {
            if (err) throw err;
            console.table(data)
            startEmpTracker()
        })
    })
}
function updateEmployee_roles() {
    inquirer.prompt([
        {
            type: "list",
            message: "Select the ROLE_id: ",
            name: "ROLE_id",
            choices: [
                {
                    name: "Manager of Sales",
                    value: 1
                },
                {
                    name: "Manager of Marketing",
                    value: 2
                },
                {
                    name: "Manager of IT",
                    value: 3
                },
                {
                    name: "inside sales-engineer",
                    value: 4
                },
                {
                    name: "Marketing executive",
                    value: 5
                },
                {
                    name: "IT employee",
                    value: 6
                }
            ]

        },
        {
            type: "list",
            message: "select employee",
            name: "employee_id",
            choices: [
                {
                    name: "Eliot Smith",
                    value: 1
                },
                {
                    name: "Amira Afzal",
                    value: 2
                },
                {
                    name: "Amir Mohamed",
                    value: 3
                },
                {
                    name: "Verónica Rodriguez",
                    value: 4
                },
                {
                    name: "Igor Stein  ",
                    value: 5
                },
                {
                    name: "Sangeetha The best",
                    value: 6
                }
            ]

        }

    ]).then(({ ROLE_id, employee_id }) => {
        db.query("UPDATE EMPLOYEE SET ROLE_ID = ? WHERE ID = ?;", [ROLE_id, employee_id], function (err, data) {
            if (err) throw err;
            console.table(data)
            startEmpTracker()
        })
    })
}