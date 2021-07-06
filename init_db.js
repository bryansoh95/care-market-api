const Caregiver = require('./app/models/Caregiver');
const Partner = require('./app/models/Partner');

const sequelize = require('./database');

const initialise_database = async () => {
    try {
        await sequelize.drop();
        await sequelize.sync({ force: true });
        console.log('Database initialised');
    } catch (error) {
        console.log(`Error in initialising database: ${error}`);
    }
    await sequelize.close();
};

initialise_database();