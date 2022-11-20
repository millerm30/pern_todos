const express = require('express');
const router = express.Router();
const crudRoutes = require('./crudRoutes');

router.use('/', crudRoutes);

module.exports = router;