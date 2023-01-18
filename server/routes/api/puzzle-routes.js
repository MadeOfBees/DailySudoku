const router = require('express').Router();
const {newPuzzle, currentPuzzle, getPuzzleByID, getAllPuzzles, deletePuzzleByID} = require('../../controllers/puzzle-controller.js');

router.route('/new').post(newPuzzle);

router.route('/current').get(currentPuzzle);

router.route('/:id').get(getPuzzleByID).delete(deletePuzzleByID);

router.route('/').get(getAllPuzzles);

module.exports = router;