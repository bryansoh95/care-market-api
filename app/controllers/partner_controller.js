const fs = require('fs-extra');
const sequelize = require('../../database');
const partner_service = require('../services/partner_service');
const { send_error_response } = require('../common/error/error_handler');

module.exports = {
    retrieve_all_partners: async (req, res) => {
        try {
            const partners = await partner_service.retrieve_all_partners();

            console.log(partners)
            return res.status(200).send(partners);
        } catch (error) {
            send_error_response(res, error);
        }
    },
    create_partner: async (req, res) => {
        try {
			const partner_data = req.body;
			let partner;

			await sequelize.transaction(async (transaction) => {
				partner = await partner_service.create_partner(partner_data, transaction);
			});

			return res.status(200).send(partner);
		} catch (error) {
			send_error_response(res, error);
		}
    },

    add_partner_image: async (req, res) => {
        const image = req.file.filename;
        try {
            return res.status(200).send(image);
        } catch (error) {
            fs.remove(image);
            send_error_response(res, error);
        }
    },
}