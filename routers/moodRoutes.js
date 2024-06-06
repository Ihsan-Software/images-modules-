const express = require('express');
const moodController = require('../controllers/moodController')
const authController = require('../controllers/authController')

const router = express.Router();

router.use(authController.protect_)

router.route('').get(moodController.getMyMoods);
router.route('').post(moodController.createMood);
router.route('/getWeeklyMoods').get(moodController.getWeeklyMoods);
router.route('/:id').delete(moodController.deleteMood);

router.use(authController.restrictTo('admin'))

router.route('').get(moodController.getMoods);
router.route('/:id').get(moodController.getMood)
router.route('/:id').patch(moodController.updateMood);



module.exports = router;