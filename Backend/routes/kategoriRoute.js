import express from 'express';

import {createKategori, getAllKategori, findIdKategoriByUsernameandNamaKategori, getKategoriByUsername,updateKategori,deleteKategori,getKategoriById} from '../controllers/kategoriController.js';

const router = express.Router();

router.post('/kategori', createKategori);
router.get('/kategori', getAllKategori);
router.get('/kategori/:username', getKategoriByUsername);
router.get('/kategori/allkategori', findIdKategoriByUsernameandNamaKategori);
router.put('/kategori/:id_kategori', updateKategori);
router.delete('/kategori/:id_kategori', deleteKategori);
router.get('/kategori/id/:id_kategori', getKategoriById);


export default router;