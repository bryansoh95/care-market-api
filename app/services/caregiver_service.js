const _ = require('lodash');
const email_validator = require('email-validator');
const Enum = require('../common/enum');
const Custom_Error = require('../common/error/custom_error');
const Error = require('../common/error/error_messages');
const checker = require('../common/checker');
const password_helper = require('../common/helpers/password_helper');

const Caregiver = require('../models/Caregiver');
const { Op } = require('sequelize/types');

module.exports = {
    create_caregiver: async(caregiver_data, transaction) => {
        const { first_name, last_name, gender, race, mobile_number, email, password } = caregiver_data;
        checker.if_empty_throw_error(first_name, Error.FIRST_NAME_REQUIRED);
        checker.if_empty_throw_error(last_name, Error.LAST_NAME_REQUIRED);
        checker.if_empty_throw_error(gender, Error.GENDER_REQUIRED);
        checker.if_empty_throw_error(race, Error.RACE_REQUIRED);
        checker.if_empty_throw_error(mobile_number, Error.MOBILE_NUMBER_REQUIRED);
        checker.if_empty_throw_error(email, Error.EMAIL_REQUIRED);
        checker.if_empty_throw_error(password, Error.PASSWORD_REQUIRED);

		caregiver_data.email = caregiver_data.email.toLowerCase();

        if(!email_validator.validate(email)) {
            throw new Custom_Error(Error.EMAIL_INVALID);
        }
        if(!checker.is_empty(await Caregiver.findOne({ where: { mobile_number } }))) {
            throw new Custom_Error(Error.MOBILE_NUMBER_NOT_UNIQUE);
        }
        if(!checker.is_empty(await Caregiver.findOne({ where: { email } }))) {
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

        checker.if_empty_throw_error(caregiver, Error.CAREGIVER_NOT_FOUND);

        return caregiver;
    },

    update_caregiver: async (id, caregiver_data, transaction) => {
        checker.if_empty_throw_error(id, Error.ID_REQUIRED);

        let caregiver = await Caregiver.findByPk(id);
        checker.if_empty_throw_error(caregiver, Error.CAREGIVER_NOT_FOUND);

        const update_keys = Object.keys(caregiver_data);

        if (update_keys.includes('password')) {
            throw new Custom_Error(Error.PASSWORD_CANNOT_CHANGE);
        }
        if (update_keys.includes('enabled')) {
            throw new Custom_Error(Error.ACCOUNT_CANNOT_BE_ENABLED_DISABLED);
        }
        if (update_keys.includes('first_name')) {
            checker.if_empty_throw_error(caregiver_data.first_name, Error.FIRST_NAME_REQUIRED);
        }
        if (update_keys.includes('last_name')) {
            checker.if_empty_throw_error(caregiver_data.last_name, Error.LAST_NAME_REQUIRED);
        }
        if (update_keys.includes('gender')) {
            checker.if_empty_throw_error(caregiver_data.gender, Error.GENDER_REQUIRED);
            if(!_.includes(Enum.Gender, gender)) {
                throw new Custom_Error(Error.GENDER_CONSTANT_UNDEFINED);
            }
        }
        if (update_keys.includes('race')) {
            checker.if_empty_throw_error(caregiver_data.race, Error.RACE_REQUIRED);
            if(!_.includes(Enum.Race, race)) {
                throw new Custom_Error(Error.RACE_CONSTANT_UNDEFINED);
            }
        }
        if (update_keys.includes('mobile_number')) {
            checker.if_empty_throw_error(caregiver_data.mobile_number, Error.MOBILE_NUMBER_REQUIRED);
            
            const caregiver_with_mobile_number = await Caregiver.findOne({
                where: {
                    mobile_number: caregiver_data.mobile_number,
                    id: { [Op.not]: id }
                }
            });
            if (!checker.is_empty(caregiver_with_mobile_number)) {
                throw new Custom_Error(Error.MOBILE_NUMBER_NOT_UNIQUE);
            }
        }
        if (update_keys.includes('email')) {
            checker.if_empty_throw_error(caregiver_data.email, Error.EMAIL_REQUIRED);

            if(!email_validator.validate(email)) {
                throw new Custom_Error(Error.EMAIL_INVALID);
            }
            
            const caregiver_with_email = await Caregiver.findOne({
                where: {
                    email: caregiver_data.email,
                    id: { [Op.not]: id }
                }
            });
            if (!checker.is_empty(caregiver_with_email)) {
                throw new Custom_Error(Error.EMAIL_NOT_UNIQUE);
            }
        }
        if (update_keys.includes('is_befriender')) {
            checker.if_empty_throw_error(caregiver_data.is_befriender, Error.BEFRIENDER_BOOLEAN_REQUIRED);
        }
        if (update_keys.includes('is_medical_escort')) {
            checker.if_empty_throw_error(caregiver_data.is_medical_escort, Error.MEDICAL_ESCORT_BOOLEAN_REQUIRED);
        }
        if (update_keys.includes('is_nurse')) {
            checker.if_empty_throw_error(caregiver_data.is_nurse, Error.NURSE_BOOLEAN_REQUIRED);
        }

        caregiver = await Caregiver.update(caregiver_data, { returning: true, transaction });

        return caregiver;
    }
};