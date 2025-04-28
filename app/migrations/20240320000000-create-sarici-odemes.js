'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SariciOdemes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sariciId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Sarici',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      odenenTutar: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      aciklama: {
        type: Sequelize.STRING
      },
      kalanBorc: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SariciOdemes');
  }
}; 