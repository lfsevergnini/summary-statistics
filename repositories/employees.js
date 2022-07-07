const fs = require('fs');

let employees = JSON.parse(fs.readFileSync('repositories/employees.json'));

const EmployeeRepository = {
  /**
   * Fetch all employees. Filtering is optional.
   * @param {Function} filter Use this function as a callback to the filter
   * @returns Array
   */
  fetchAll: (filter = null) => {
    if (!filter) return employees;

    return employees.filter(filter);
  },

  getNextId: () => {
    if (employees.length === 0) {
      return 1;
    }

    return employees[employees.length - 1].id;
  },

  insert: (employee) => {
    const id = this.getNextId();

    employees.push({ id, ...employee });
  },

  delete: (id) => {
    employees = employees.filter((e) => e.id !== id);
  },
};

module.exports = EmployeeRepository;
