const express = require('express');
const router = express.Router()

const employeeRepository = require('../repositories/employees');
const summaryStatistics = require('../statistics/summary');

router.get('/', (req, res) => {
  const salaries = employeeRepository.fetchAll().map(emp => emp.salary);

  const summary = summaryStatistics.getSummaryStatistics(salaries);

  res.send(summary);
});

module.exports = router;
