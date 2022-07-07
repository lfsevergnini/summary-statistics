const express = require('express');

const router = express.Router();

const employeeRepository = require('../repositories/employees');

router.post('/', (req, res) => {
  /*
    #swagger.tags = ['Employees']
    #swagger.summary = 'Insert a new employee in the company'
    #swagger.requestBody = {
      required: true,
      schema: { $ref: "#/definitions/AddEmployee" }
    }
    #swagger.responses[200] = {
        description: "Company summary statistics",
        content: {
            "application/json": {
                schema:{
                  $ref: "#/definitions/Employee"
                }
            }
        }
    }
  */
  const payload = req.body;
  const newEmployee = employeeRepository.insert(payload);

  res.send(newEmployee);
});

module.exports = router;
