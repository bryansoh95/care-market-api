const fs = require('fs-extra');
const checker = require('../common/checker');
const Custom_Error = require('../common/error/custom_error');
const Error = require('../common/error/error_messages');
const { send_error_response } = require('../common/error/error_handler');

module.exports = {
    pre_upload_check_image: async (req, res, next) => {
        try {            
            const file = req.file;

            checker.if_empty_throw_error(file, Error.FILE_REQUIRED);
            if (file.filename.slice(-4) !== '.png' && file.filename.slice(-4) !== '.jpg' && file.filename.slice(-5) !== '.jpeg') {
                fs.remove(`./app/assets/${file.filename}`);
                throw new Custom_Error(Error.IMAGE_REQUIRED);
            }
            return next();
        } catch (error) {
            send_error_response(res, error);
        }
    }
};