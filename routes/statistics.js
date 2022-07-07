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
  /*
    #swagger.tags = ['Statistics']
    #swagger.summary = 'Get Summary Statistics (SS) for all employees.'
    #swagger.parameters['on_contract'] = {
      in: 'query',
      description: 'Gets only employeees on contract (0 or 1)',
      type: 'int'
    }
    #swagger.responses[200] = {
        description: "Company summary statistics",
        content: {
            "application/json": {
                schema:{
                  $ref: "#/definitions/SummaryStatistics"
                }
            }
        }
    }
  */
  const filter = parseInt(req.query.on_contract) ? (e) => e.on_contract : null;

  const employees = employeeRepository.fetchAll(filter);

  const salaries = employees.map((emp) => emp.salary);

  const summary = summaryStatistics.getSummaryStatistics(salaries);

  res.send(summary);
});

router.get('/departments', (req, res) => {
  /*
    #swagger.tags = ['Statistics']
    #swagger.summary = 'Get summary statistics for all departments.'
    #swagger.responses[200] = {
        description: "Departments summary statistics",
        content: {
            "application/json": {
                schema:{
                    $ref: "#/definitions/DepartmentSS"
                }
            }
        }
    }
  */
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
  /*
    #swagger.tags = ['Statistics']
    #swagger.summary = 'Get summary statistics for all sub-departments.'
    #swagger.responses[200] = {
        description: "Sub-departments summary statistics",
        content: {
            "application/json": {
                schema:{
                    $ref: "#/definitions/SubDepartmentSS"
                }
            }
        }
    }
  */
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
