const fs = require('fs-extra');
const sequelize = require('../../database');
const company_service = require('../services/company_service');
const { send_error_response } = require('../common/error/error_handler');

module.exports = {
    retrieve_company: async (req, res) => {
        try {
            const company = await company_service.retrieve_company();

            return res.status(200).send(company);
        } catch (error) {
            send_error_response(res, error);
        }
    },
    create_company: async (req, res) => {
        try {
			const company_data = req.body;
			let company;

			await sequelize.transaction(async (transaction) => {
				company = await company_service.create_company(company_data, transaction);
			});

			return res.status(200).send(company);
		} catch (error) {
			send_error_response(res, error);
		}
    }
}