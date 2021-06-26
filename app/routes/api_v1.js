const express = require('express');
const router = express.Router();

const caregiver_controller = require('../controllers/caregiver_controller');

// Caregiver
router.get('/caregiver/:id', caregiver_controller.retrieve_caregiver);
router.get('/caregivers', caregiver_controller.retrieve_all_caregivers);
router.post('/caregiver', caregiver_controller.create_caregiver);
router.put('/caregiver/enable/:id', caregiver_controller.enable_caregiver);
router.put('/caregiver/disable/:id', caregiver_controller.disable_caregiver);
router.put('/caregiver/:id', caregiver_controller.update_caregiver);

module.exports = router;