const router = require('express').Router();
const {newScore, scorebyID, allScores, topTenScores, deleteByID, deleteAll} = require('../../controllers/scores-controller.js');

router.route('/new').post(newScore);

router.route('/:id').get(scorebyID).delete(deleteByID);

router.route('/').get(allScores).delete(deleteAll);

router.route('/top').get(topTenScores);

module.exports = router;