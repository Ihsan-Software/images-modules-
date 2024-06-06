const express = require('express');
const focusController = require('../controllers/focusController')
const authController = require('../controllers/authController')

const router = express.Router();

router.use(authController.protect_)

router.route('').get(focusController.getMyFocus);
router.route('').post(focusController.createFocus);
router.route('/:id').delete(focusController.deleteFocus);


router.use(authController.restrictTo('admin'))

router.route('').get(focusController.getFocuses);
router.route('/:id').get(focusController.getFocus)
router.route('/:id').patch(focusController.updateFocus);



module.exports = router;