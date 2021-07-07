const Sequelize = require('sequelize');
const {
  BOOLEAN, INTEGER, Model, STRING
} = Sequelize;
const sequelize = require('../../database');

class Company extends Model {
}

Company.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: STRING,
      allowNull: false
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    image: {
        type: STRING,
        allowNull: false
    },
    enabled: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'company',
    underscored: true
  }
);

module.exports = Company;