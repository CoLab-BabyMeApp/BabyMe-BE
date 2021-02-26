const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('api/v1/daycares', require('./controllers/daycares'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
