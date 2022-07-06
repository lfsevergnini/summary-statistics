const fs = require('fs');

const employees = JSON.parse(fs.readFileSync('repositories/employees.json'));

const EmployeeRepository = {
    fetchAll: () => employees,

    insert: (employee) => employees.push(employee),

    delete: (id) => {
        employees = employees.filter(e => e.id !== id);
    },
}

module.exports = EmployeeRepository;
