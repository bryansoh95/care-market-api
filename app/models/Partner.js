const Sequelize = require('sequelize');
const {
  BOOLEAN, INTEGER, Model, STRING
} = Sequelize;
const sequelize = require('../../database');

class Partner extends Model {
}

Partner.init(
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
    url: {
        type: STRING,
        allowNull: true
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
    modelName: 'partner',
    underscored: true
  }
);

module.exports = Partner;