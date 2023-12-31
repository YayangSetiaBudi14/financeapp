import express from 'express';
import {createOutcome , getAllOutcome, getOutcomeByUser, getUserOutcomes,deleteOutcome,getOutcomeByday,getTotalOutcomeInPeriod,getSumOutcomeByCategory,getsumalloutcomebycategory}from '../controllers/outcomeController.js';

const router = express.Router();

router.get('/outcome/per/:username', getUserOutcomes); // Put the more specific route first
router.post('/outcome', createOutcome);
router.get('/outcome', getAllOutcome);
router.delete('/outcome/:id_outcome', deleteOutcome);
router.get('/outcome/periode', getOutcomeByday);
router.get('/outcome/total', getTotalOutcomeInPeriod);
router.get('/outcome/sum/:id_kategori', getSumOutcomeByCategory);
router.get('/outcome/sumall/:username', getsumalloutcomebycategory);


// router.get('/outcome/:id_wallet', getOutcomeByUser);

export default router;