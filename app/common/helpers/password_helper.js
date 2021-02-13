const bcrypt = require('bcrypt');

const salt_rounds = 10;

module.exports = {
    hash_password: async (password) => {
        const salt = await bcrypt.genSalt(salt_rounds);

        return await bcrypt.hash(password, salt);
    },

    compare_password: async (password_input, hashed_password) => {
        return bcrypt.compare(password_input, hashed_password);
    }
};