'use strict'

// You can use require to import .js, .json, or .node files

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('example.sqlite')

db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary NUM(4, 2), department TEXT)")

const populateEmployees = function() {
	const {list} = require('./employees.json')

	list.forEach(each => {
		db.run(`INSERT INTO employees VALUES (
			${each.id},
			"${each.firstName}",
			"${each.lastName}",
			${each.salary},
			"${each.dept}"
		)`)
	})
}

populateEmployees()

// only returns first match
// db.get(`SELECT  * FROM employees`, (err, row) => {
// 	if(err) return console.error(err)
// 	console.log(row)
// })
// Select * from employees
// where salary > 50000
// orderby a thing


db.all(`SELECT * FROM employees`, (err, all) => {
	if(err) return console.error(err)
	// console.log(all)
	// all.forEach(employee => {
	// 	const {first, last, salary, department} = employee
	// 	console.log(`${first} ${last} makes \$${salary}.00 in the ${department} department`)
	// })

	const results = all.sort((a, b) => {
    if(a.first < b.first) return -1;
    if(a.first > b.first) return 1;
    return 0;
	}).filter(employee => { return employee.salary > 50000 })
		.map(employee => {
			const {first, last, salary} = employee
			return { first, last, salary }
		})

	console.log(results)
})
// sort alphabetically
// new array of employees > 50000
// new array with first, last, name, salary


// db.each(`SELECT * FROM employees`, (err, employee) => {
// 	if(err) return console.error(err)
// 	const {first, last, salary, department} = employee
// 	console.log(`${first}, ${last}, ${salary}, ${department}`)
// })





































