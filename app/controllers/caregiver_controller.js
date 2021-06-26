const sequelize = require('../../database');
const { send_error_response } = require('../common/error/error_handler');
const caregiver_service = require('../services/caregiver_service');

module.exports = {
	create_caregiver: async (req, res) => {
		try {
			const caregiver_data = req.body;
			let caregiver;

			await sequelize.transaction(async (transaction) => {
				caregiver = await caregiver_service.create_caregiver(caregiver_data, transaction);
			});

			return res.status(200).send(caregiver);
		} catch (error) {
			send_error_response(res, error);
		}
	},

	retrieve_caregiver: async (req, res) => {
		try {
			const { id } = req.params;
			
			const caregiver = await caregiver_service.retrieve_caregiver(id);

			return res.status(200).send(caregiver);
		} catch (error) {
			send_error_response(res, error);
		}
	},

	retrieve_all_caregivers: async (req, res) => {
		try {
			const caregivers = await caregiver_service.retrieve_all_caregivers();

			return res.status(200).send(caregivers);
		} catch (error) {
			send_error_response(res, error);
		}
	},

	update_caregiver: async (req, res) => {
		try {
			const { id } = req.params;
			const caregiver_data = req.body;

			let caregiver;
			await sequelize.transaction(async (transaction) => {
				caregiver = await caregiver_service.update_caregiver(id, caregiver_data, transaction);
			});

			return res.status(200).send(caregiver);
		} catch (error) {
			console.log(error)
			send_error_response(res, error);
		}
	},

	enable_caregiver: async (req, res) => {
		try {
			const { id } = req.params;

			let caregiver;
			await sequelize.transaction(async (transaction) => {
				caregiver = await caregiver_service.enable_caregiver(id, transaction);
			});

			return res.status(200).send(caregiver);
		} catch (error) {
			send_error_response(res, error);
		}		
	},

	disable_caregiver: async (req, res) => {
		try {
			const { id } = req.params;

			let caregiver;
			await sequelize.transaction(async (transaction) => {
				caregiver = await caregiver_service.disable_caregiver(id, transaction);
			});

			return res.status(200).send(caregiver);
		} catch (error) {
			send_error_response(res, error);
		}		
	}
};