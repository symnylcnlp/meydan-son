const express = require('express');
const router = express.Router();
const sariciController = require('../controllers/sarici.controller');

router.get('/', sariciController.getAll);
router.get('/:id', sariciController.getById);
router.post('/', sariciController.create);
router.put('/:id', sariciController.update);
router.delete('/:id', sariciController.delete);
router.post('/:id/tutun-ekle', sariciController.tutunEkle);
router.post('/:id/makaron-ekle', sariciController.makaronEkle);
router.post('/:id/sigara-ekle', sariciController.sigaraEkle);
router.get('/:id/hesapla-borc', sariciController.hesaplaBorc);
router.post('/:id/hazir-koli-al', sariciController.hazirKoliAl);
router.post('/:id/borc-ode', sariciController.borcOde);
router.get('/:id/malzeme-gecmisi', sariciController.getMalzemeGecmisi);
router.get('/:id/odeme-gecmisi', sariciController.odemeGecmisi);

module.exports = router; 