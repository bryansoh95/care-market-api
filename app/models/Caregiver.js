const Sequelize = require('sequelize');
const {
  INTEGER, Model, STRING
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
    mobile_number: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize,
    modelName: 'caregiver',
    underscored: true
  }
);


module.exports = Caregiver;