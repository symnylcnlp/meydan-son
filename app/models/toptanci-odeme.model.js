const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ToptanciOdeme extends Model {
    static associate(models) {
      ToptanciOdeme.belongsTo(models.Toptanci, {
        foreignKey: 'toptanciId',
        as: 'toptanci'
      });
    }
  }

  ToptanciOdeme.init({
    toptanciId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Toptanci',
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
    modelName: 'ToptanciOdeme',
    tableName: 'ToptanciOdemes'
  });

  return ToptanciOdeme;
}; 