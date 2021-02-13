const Caregiver = require('./app/models/Caregiver');

const sequelize = require('./database');

const initialise_database = async () => {
    await sequelize.drop()
        .then(async () => {
            return sequelize.sync({ force: true });
        })
        .catch((error) => {
            console.log(`Error in initialising database: ${error}`);
        });

    await sequelize.close();
    console.log('Database initialised');
};

initialise_database();