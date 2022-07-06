const express = require('express');

const router = express.Router();

const employeeRepository = require('../repositories/employees');
const summaryStatistics = require('../statistics/summary');

router.get('/', (req, res) => {
  let employees = employeeRepository.fetchAll();

  if (req.query.on_contract) {
    employees = employees.filter((e) => e.on_contract);
  }

  const salaries = employees.map((emp) => emp.salary);

  const summary = summaryStatistics.getSummaryStatistics(salaries);

  res.send(summary);
});

module.exports = router;
