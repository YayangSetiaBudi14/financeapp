import express from 'express';

import {createKategori, getAllKategori, findIdKategoriByUsernameandNamaKategori, getKategoriByUsername} from '../controllers/kategoriController.js';

const router = express.Router();

router.post('/kategori', createKategori);
router.get('/kategori', getAllKategori);
router.get('/kategori/:username', getKategoriByUsername);
router.get('/kategori/allkategori', findIdKategoriByUsernameandNamaKategori);


export default router;