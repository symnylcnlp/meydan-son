const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
);

async function runMigrations() {
  try {
    // Migration dosyalarını oku
    const migrationsPath = path.join(__dirname, '../migrations');
    const migrationFiles = fs.readdirSync(migrationsPath)
      .filter(file => file.endsWith('.js'))
      .sort();

    // Migration tablosunu oluştur
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS "SequelizeMeta" (
        "name" VARCHAR(255) NOT NULL PRIMARY KEY
      );
    `);

    // Çalıştırılmış migration'ları al
    const [executedMigrations] = await sequelize.query(
      'SELECT name FROM "SequelizeMeta"'
    );
    const executedMigrationNames = executedMigrations.map(m => m.name);

    // Migration'ları çalıştır
    for (const file of migrationFiles) {
      if (!executedMigrationNames.includes(file)) {
        console.log(`Running migration: ${file}`);
        const migration = require(path.join(migrationsPath, file));
        await migration.up(sequelize.getQueryInterface(), Sequelize);
        await sequelize.query(
          'INSERT INTO "SequelizeMeta" (name) VALUES ($1)',
          { bind: [file] }
        );
      }
    }

    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await sequelize.close();
  }
}

runMigrations(); 