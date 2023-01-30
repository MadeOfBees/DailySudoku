const router = require('express').Router();
const {newUser, allUsers, userbyID, deleteByID,deleteAll,isValidUser} = require('../../controllers/user-controller.js');

router.route('/new').post(newUser);

router.route('/isValid/:id').get(isValidUser);

router.route('/:id').get(userbyID).delete(deleteByID);

router.route('/').get(allUsers).delete(deleteAll);

module.exports = router;