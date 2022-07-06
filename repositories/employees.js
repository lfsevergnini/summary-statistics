const fs = require('fs');

const employees = JSON.parse(fs.readFileSync('repositories/employees.json'));

const EmployeeRepository = {
    fetchAll: () => employees,

    insert: (employee) => employees.push(employee),

    delete: (id) => {
        employees = employees.filter(e => e.id !== id);
    },

    compare: (employeeA, employeeB) => {
        const [salaryA, salaryB] = [Number.parseInt(employeeA.salary), Number.parseInt(employeeB.salary)];

        if (salaryA > salaryB)
            return 1;

        if (salaryA < salaryB)
            return -1;

        return 0;
    },
}

module.exports = EmployeeRepository;
