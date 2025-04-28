const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class SariciOdeme extends Model {
  static associate(models) {
    SariciOdeme.belongsTo(models.Sarici, {
      foreignKey: 'sariciId',
      as: 'sarici'
    });
  }
}

SariciOdeme.init({
  sariciId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Sarici',
      key: 'id'
    }
  },
  odenenTutar: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  aciklama: {
    type: DataTypes.STRING
  },
  kalanBorc: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'SariciOdeme',
  tableName: 'SariciOdemes',
  timestamps: true
});

module.exports = SariciOdeme; 