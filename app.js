const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const sequelize = require('./app/config/database');
const swaggerSpecs = require('./app/config/swagger');

const sariciRoutes = require('./app/routes/sarici.routes');
const toptanciRoutes = require('./app/routes/toptanci.routes');
const paketciRoutes = require('./app/routes/paketci.routes');
const sigaraTuruRoutes = require('./app/routes/sigara-turu.routes');
const siparisRoutes = require('./app/routes/siparis.routes');
const odemeTakvimiRoutes = require('./app/routes/odeme-takvimi.routes');

const app = express();

// CORS ayarları
app.use(cors({
  origin: '*', // Tüm domainlerden erişime izin ver
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // İzin verilen HTTP metodları
  allowedHeaders: ['Content-Type'], // İzin verilen headerlar
  exposedHeaders: ['Content-Range', 'X-Content-Range'], // Client'a açık olan headerlar
  credentials: true, // Cookie ve auth header'lara izin ver
  maxAge: 86400 // CORS önbellek süresi (24 saat)
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Ana sayfa - Swagger UI'a yönlendir
app.get('/', (req, res) => {
  res.render('index', { title: 'Meydan API Dokümantasyonu' });
});

// Routes
app.use('/api/saricilar', sariciRoutes);
app.use('/api/toptancilar', toptanciRoutes);
app.use('/api/paketciler', paketciRoutes);
app.use('/api/sigara-turleri', sigaraTuruRoutes);
app.use('/api/siparisler', siparisRoutes);
app.use('/api/odeme-takvimi', odemeTakvimiRoutes);

// Veritabanı bağlantısı ve şema güncellemesi
async function initDatabase() {
  try {
    // Sequelize bağlantısı
    await sequelize.authenticate();
    console.log('Veritabanı bağlantısı başarılı.');
    
    // Tüm modelleri senkronize et
    await sequelize.sync({ force: true }); // force: true ile tüm tabloları yeniden oluştur
    console.log('Tüm tablolar yeniden oluşturuldu.');
    
    // Mevcut tabloları kontrol et
    const [tables] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('Oluşturulan tablolar:', tables.map(t => t.table_name));
    
    console.log('Veritabanı başlatma tamamlandı.');
  } catch (err) {
    console.error('Veritabanı başlatma hatası:', err);
  }
}

// Veritabanını başlat
initDatabase();

module.exports = app;
