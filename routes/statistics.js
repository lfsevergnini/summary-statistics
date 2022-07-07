const express = require('express');

const router = express.Router();

const employeeRepository = require('../repositories/employees');
const summaryStatistics = require('../statistics/summary');

const getGroupStatistics = (department) => {
  const salaries = department[1].map((emp) => emp.salary);

  return {
    department: department[0],
    summary: summaryStatistics.getSummaryStatistics(salaries),
  };
};

router.get('/', (req, res) => {
  const filter = req.query.on_contract ? (e) => e.on_contract : null;

  const employees = employeeRepository.fetchAll(filter);

  const salaries = employees.map((emp) => emp.salary);

  const summary = summaryStatistics.getSummaryStatistics(salaries);

  res.send(summary);
});

router.get('/departments', (req, res) => {
  const employees = employeeRepository.fetchAll();

  const departments = {};

  employees.forEach((e) => {
    if (!departments[e.department]) {
      departments[e.department] = [];
    }

    departments[e.department].push(e);
  });

  const summary = Object.entries(departments).map(getGroupStatistics);

  res.send(summary);
});

router.get('/sub-departments', (req, res) => {
  const employees = employeeRepository.fetchAll();

  const departments = {};

  employees.forEach((e) => {
    const index = `${e.department}-${e.sub_department}`;

    if (!departments[index]) {
      departments[index] = [];
    }

    departments[index].push(e);
  });

  const summary = Object.entries(departments).map(getGroupStatistics);

  res.send(summary);
});

module.exports = router;
