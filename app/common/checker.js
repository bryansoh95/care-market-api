const _ = require('lodash');
const Custom_Error = require('./error/custom_error');

const isEmpty = (object) => {
	if (_.isNull(object) || _.isUndefined(object) || typeof object === 'undefined' || object === '' || object === 'undefined') {
    	return true;
  	} else if (_.isArray(object) && object.length === 0) {
    	return true;
  	}
  	return false;
};

module.exports = {
	isEmpty,
	ifEmptyThrowError: (object, error_message) => {
		if (isEmpty(object)) {
			throw new Custom_Error(error_message);
		}
	}
};