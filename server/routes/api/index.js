const router = require('express').Router();
const puzzleRoutes = require('./puzzle-routes');
const scoresRoutes = require('./scores-routes');
const userRoutes = require('./user-routes');

router.use('/puzzles', puzzleRoutes);
router.use('/scores', scoresRoutes);
router.use('/users', userRoutes);

module.exports = router;
