const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const app = express();
const port = 3000;

const statistics = require('./routes/statistics');

app.use('/statistics', statistics);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
