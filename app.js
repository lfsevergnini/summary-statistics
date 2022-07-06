const express = require('express');
const app = express();
const port = 3000;

const statistics = require('./routes/statistics');

app.use('/statistics', statistics);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
