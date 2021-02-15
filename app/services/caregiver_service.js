const _ = require('lodash');
const email_validator = require('email-validator');
const Enum = require('../common/enum');
const Custom_Error = require('../common/error/custom_error');
const Error = require('../common/error/error_messages');
const checker = require('../common/checker');
const password_helper = require('../common/helpers/password_helper');

const Caregiver = require('../models/Caregiver');

module.exports = {
    create_caregiver: async(caregiver_data, transaction) => {
        const { first_name, last_name, gender, race, mobile_number, email, password } = caregiver_data;
        checker.ifEmptyThrowError(first_name, Error.FIRST_NAME_REQUIRED);
        checker.ifEmptyThrowError(last_name, Error.LAST_NAME_REQUIRED);
        checker.ifEmptyThrowError(gender, Error.GENDER_REQUIRED);
        checker.ifEmptyThrowError(race, Error.RACE_REQUIRED);
        checker.ifEmptyThrowError(mobile_number, Error.MOBILE_NUMBER_REQUIRED);
        checker.ifEmptyThrowError(email, Error.EMAIL_REQUIRED);
        checker.ifEmptyThrowError(password, Error.PASSWORD_REQUIRED);

		caregiver_data.email = caregiver_data.email.toLowerCase();

        if(!email_validator.validate(email)) {
            throw new Custom_Error(Error.EMAIL_INVALID);
        }
        if(!checker.isEmpty(await Caregiver.findOne({ where: { mobile_number } }))) {
            throw new Custom_Error(Error.MOBILE_NUMBER_NOT_UNIQUE);
        }
        if(!checker.isEmpty(await Caregiver.findOne({ where: { email } }))) {
            throw new Custom_Error(Error.EMAIL_NOT_UNIQUE);
        }
    
        if(!_.includes(Enum.Gender, gender)) {
            throw new Custom_Error(Error.GENDER_CONSTANT_UNDEFINED);
        }
        if(!_.includes(Enum.Race, race)) {
            throw new Custom_Error(Error.RACE_CONSTANT_UNDEFINED);
        }

        if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/).test(password)) {
            throw new CustomError(Error.PASSWORD_WEAK);
        }

        caregiver_data.password = await password_helper.hash_password(password);

        const caregiver = await Caregiver.create(caregiver_data, { transaction });

		return caregiver;
    },

    retrieve_caregiver: async (id) => {
        const caregiver = await Caregiver.findByPk(id);

        checker.ifEmptyThrowError(caregiver, Error.CAREGIVER_NOT_FOUND);

        return caregiver;
    }
};