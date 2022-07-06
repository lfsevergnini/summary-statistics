const express = require('express');

const router = express.Router();

const employeeRepository = require('../repositories/employees');
const summaryStatistics = require('../statistics/summary');

router.get('/', (req, res) => {
  const filter = req.query.on_contract ? (e) => e.on_contract : null;

  const employees = employeeRepository.fetchAll(filter);

  const salaries = employees.map((emp) => emp.salary);

  const summary = summaryStatistics.getSummaryStatistics(salaries);

  res.send(summary);
});

module.exports = router;
