const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const employeeRepository = require('../repositories/employees');

router.post(
  '/',
  body('name').exists().isString().isLength({ min: 3 }),
  body('salary').exists().isNumeric(),
  body('currency').exists().isString().isLength({ min: 3 }),
  body('department').exists().isString(),
  body('sub_department').exists().isString(),
  body('on_contract').optional().isBoolean({ strict: false }),
  (req, res) => {
    /*
      #swagger.tags = ['Employees']
      #swagger.summary = 'Insert a new employee in the company'
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/AddEmployee" }
      }
      #swagger.responses[200] = {
          description: "Newly created employee",
          content: {
              "application/json": {
                  schema:{
                    $ref: "#/definitions/Employee"
                  }
              }
          }
      }
      #swagger.responses[400] = {
          description: "Validation errors",
          content: {
              "application/json": {
                  schema:{
                    $ref: "#/definitions/EmployeeError"
                  }
              }
          }
      }
      #swagger.security = [{
        "bearerAuth": []
      }]
    */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const payload = req.body;
    const newEmployee = employeeRepository.insert(payload);

    return res.send(newEmployee);
  },
);

router.delete(
  '/:id',
  (req, res) => {
    /*
      #swagger.tags = ['Employees']
      #swagger.summary = 'Remove one employee from the company'
    */
    const id = parseInt(req.params.id);

    if (employeeRepository.delete(id)) {
      return res.status(204).send();
    }

    return res.status(404).send();
  },
);

module.exports = router;
