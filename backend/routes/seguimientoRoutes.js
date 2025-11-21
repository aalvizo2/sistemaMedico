import express from 'express';
import { deleteSeguimiento, getSeguimientoMedico, newSeguimiento, updateSeguimiento } from '../controllers/seguimientoController.js';


const router= express.Router();

router.get('/', getSeguimientoMedico);
router.post('/', newSeguimiento);
router.put('/:Id', updateSeguimiento);
router.delete('/:Id', deleteSeguimiento)

export default router;