const express = require('express');
const router = express.Router();
const { getJobs, createJob, updateJob, deleteJob, getAllJobsAdmin } = require('../controllers/jobController');
const { protect, admin } = require('../middleware/auth');

router.route('/').get(protect, getJobs).post(protect, createJob);
router.route('/all').get(protect, admin, getAllJobsAdmin);
router.route('/:id').put(protect, updateJob).delete(protect, deleteJob);

module.exports = router;
