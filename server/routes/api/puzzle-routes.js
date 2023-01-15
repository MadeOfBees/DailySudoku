const router = require('express').Router();

const {getAllPuzzles,createPuzzle,deletePuzzle,findPuzzleById } = require('../../controllers/puzzle-controller');

router.route('/').get(getAllPuzzles).post(createPuzzle);

router.route('/:id').delete(deletePuzzle).get(findPuzzleById);

module.exports = router;
