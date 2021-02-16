const _ = require('lodash');
const Custom_Error = require('./error/custom_error');

const is_empty = (object) => {
	if (_.isNull(object) || _.isUndefined(object) || typeof object === 'undefined' || object === '' || object === 'undefined') {
    	return true;
  	} else if (_.isArray(object) && object.length === 0) {
    	return true;
  	}
  	return false;
};

module.exports = {
	is_empty,
	if_empty_throw_error: (object, error_message) => {
		if (is_empty(object)) {
			throw new Custom_Error(error_message);
		}
	}
};