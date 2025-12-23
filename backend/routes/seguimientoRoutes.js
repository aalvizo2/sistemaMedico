import express from 'express';
import { deleteSeguimiento, getSeguimientoByPatientId, getSeguimientoMedico, newSeguimiento, updateSeguimiento } from '../controllers/seguimientoController.js';


const router= express.Router();

router.get('/', getSeguimientoMedico);
router.post('/', newSeguimiento);
router.put('/:Id', updateSeguimiento);
router.delete('/:Id', deleteSeguimiento);
router.get('/:PatientId', getSeguimientoByPatientId);

export default router;