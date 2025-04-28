const Sarici = require('./sarici.model');
const SariciOdeme = require('./sarici-odeme.model');
const MalzemeGecmisi = require('./malzeme-gecmisi.model');

// Model ilişkileri
Sarici.hasMany(SariciOdeme, { foreignKey: 'sariciId' });
SariciOdeme.belongsTo(Sarici, { foreignKey: 'sariciId' });

Sarici.hasMany(MalzemeGecmisi, { foreignKey: 'sariciId' });
MalzemeGecmisi.belongsTo(Sarici, { foreignKey: 'sariciId' });

module.exports = {
  Sarici,
  SariciOdeme,
  MalzemeGecmisi
}; 