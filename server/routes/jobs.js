const express = require('express');
const router = express.Router();
const { getJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getJobs).post(protect, createJob);
router.route('/:id').put(protect, updateJob).delete(protect, deleteJob);

module.exports = router;
