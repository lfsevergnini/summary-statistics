const express = require('express');
const app = express();
const port = 3000;

const employeeRepository = require('./repositories/employees');

app.get('/', (req, res) => {
  const employees = employeeRepository.fetchAll();
  res.send(employees);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
