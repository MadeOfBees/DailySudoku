const router = require('express').Router();
const {newScore, scorebyID, allScores, topTenScores, deleteByID, deleteAll, todaysTopTenScores, seeAllUserScores, deleteAllByUser} = require('../../controllers/scores-controller.js');

router.route('/new').post(newScore);

router.route('/top').get(topTenScores);

router.route('/todaysTop').get(todaysTopTenScores);

router.route('/user/:id').get(seeAllUserScores).delete(deleteAllByUser);

router.route('/:id').get(scorebyID).delete(deleteByID);

router.route('/').get(allScores).delete(deleteAll);

module.exports = router;