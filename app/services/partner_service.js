const config = require('config');
const _ = require('lodash');
const Custom_Error = require('../common/error/custom_error');
const Error = require('../common/error/error_messages');
const checker = require('../common/checker');

const Partner = require('../models/Partner');

module.exports = {
    retrieve_all_partners: async () => {
        const partners = await Partner.findAll();

        return partners;
    },
    
    create_partner: async (partner_data, transaction) => {
        const { name, email, image } = partner_data;
        
        checker.if_empty_throw_error(name, Error.NAME_REQUIRED);
        checker.if_empty_throw_error(email, Error.EMAIL_REQUIRED);
        checker.if_empty_throw_error(image, Error.IMAGE_REQUIRED);

        const partner = await Partner.create(partner_data, { transaction });

        return partner;
    }
};