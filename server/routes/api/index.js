const router = require('express').Router();
const puzzleRoutes = require('./puzzle-routes');

router.use('/puzzles', puzzleRoutes);

module.exports = router;
