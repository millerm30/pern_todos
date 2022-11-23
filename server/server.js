const express = require('express');
const app = express();
const PORT = process.env.PORT || 3010;
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const database = require('./config/database.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

database.authenticate().then(() => {
  console.log('Database connected');
}) .catch(err => {
  console.log('Error: ' + err);
});

app.use('/api', require('./routes/crudRoutes'));

database.sync().then(() => {
  app.listen(PORT,
    console.log(`Server is running on port ${PORT}`));
  }) .catch(err => {
    console.log('Error: ' + err);
});
