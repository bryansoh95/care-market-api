const config = require('config');
const _ = require('lodash');
const Custom_Error = require('../common/error/custom_error');
const Error = require('../common/error/error_messages');
const checker = require('../common/checker');

const Company = require('../models/Company');

module.exports = {
    retrieve_company: async () => {
        const company = await Company.findByPk(1);

        return company;
    },
    
    create_company: async (company_data, transaction) => {
        const { name, email, image } = company_data;
        
        checker.if_empty_throw_error(name, Error.NAME_REQUIRED);
        checker.if_empty_throw_error(email, Error.EMAIL_REQUIRED);
        checker.if_empty_throw_error(image, Error.IMAGE_REQUIRED);

        const company = await Company.create(company_data, { transaction });

        return company;
    }
};