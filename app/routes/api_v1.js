const express = require('express');
const router = express.Router();

const caregiver_controller = require('../controllers/caregiver_controller');

// Caregiver
router.post('/caregiver', caregiver_controller.create_caregiver);

module.exports = router;