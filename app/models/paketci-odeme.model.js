const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PaketciOdeme extends Model {
    static associate(models) {
      PaketciOdeme.belongsTo(models.Paketci, {
        foreignKey: 'paketciId',
        as: 'paketci'
      });
    }
  }

  PaketciOdeme.init({
    paketciId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Paketci',
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
    modelName: 'PaketciOdeme',
    tableName: 'PaketciOdemes'
  });

  return PaketciOdeme;
}; 