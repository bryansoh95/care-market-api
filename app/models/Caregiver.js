const Sequelize = require('sequelize');
const {
  BOOLEAN, INTEGER, Model, STRING
} = Sequelize;
const sequelize = require('../../database');

class Caregiver extends Model {
}

Caregiver.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    first_name: {
      type: STRING,
      allowNull: false
    },
    last_name: {
      type: STRING,
      allowNull: false
    },
    gender: {
        type: STRING,
        allowNull: false
        },
    race: {
        type: STRING,
        allowNull: false
    },
    mobile_number: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    password: {
        type: STRING,
        allowNull: false
    },
    is_befriender: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    is_medical_escort: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    is_nurse: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    enabled: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'caregiver',
    underscored: true
  }
);


module.exports = Caregiver;