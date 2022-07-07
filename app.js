const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const employees = require('./routes/employees');
const statistics = require('./routes/statistics');

app.use('/employees', employees);
app.use('/statistics', statistics);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
