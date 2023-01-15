const router = require('express').Router();
const puzzleRoutes = require('./puzzle-routes');

router.use('/puzzle', puzzleRoutes);

module.exports = router;
