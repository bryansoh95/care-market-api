const express = require('express');
const multer = require('multer');
const router = express.Router();
const app = require('../../app');
let i = 0;
const storage = multer.diskStorage({
    destination: './app/assets',
    filename: (req, file, next) => {
        next(
            null,
            `${Date.now() + i}.${file.mimetype.split('/')[1]}`
        );
        i++;
    },
});
const multer_upload = multer({ storage: storage })

// Middleware
const upload = require('../middleware/upload');

// Controllers
const caregiver_controller = require('../controllers/caregiver_controller');
const partner_controller = require('../controllers/partner_controller');

// Caregiver
router.get('/caregiver/:id', caregiver_controller.retrieve_caregiver);
router.get('/caregivers', caregiver_controller.retrieve_all_caregivers);
router.post('/caregiver/login', caregiver_controller.login_caregiver);
router.post('/caregiver', caregiver_controller.create_caregiver);
router.put('/caregiver/enable/:id', caregiver_controller.enable_caregiver);
router.put('/caregiver/disable/:id', caregiver_controller.disable_caregiver);
router.put('/caregiver/:id', caregiver_controller.update_caregiver);

// Partner
router.get('/partners', partner_controller.retrieve_all_partners);
router.post('/partner/addImage', multer_upload.single('file'), upload.pre_upload_check_image, partner_controller.add_partner_image);
router.post('/partner', partner_controller.create_partner);

module.exports = router;