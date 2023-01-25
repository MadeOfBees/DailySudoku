const router = require('express').Router();
const puzzleRoutes = require('./puzzle-routes');
const scoresRoutes = require('./scores-routes');

router.use('/puzzles', puzzleRoutes);
router.use('/scores', scoresRoutes);

module.exports = router;
