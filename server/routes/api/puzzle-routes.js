const router = require('express').Router();
const {newPuzzle, currentPuzzle} = require('../../controllers/puzzle-controller.js');

router.route('/new').post(newPuzzle);

router.route('/current').get(currentPuzzle);

module.exports = router;