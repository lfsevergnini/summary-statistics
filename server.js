const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const app = express();

app.use(bodyParser.json());

const auth = require('./routes/auth');
const employees = require('./routes/employees');
const statistics = require('./routes/statistics');

const authMiddleware = require('./middleware/auth');

app.use('/auth', auth);
app.use('/employees', authMiddleware, employees);
app.use('/statistics', authMiddleware, statistics);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
