import { findConsulta, newConsulta } from "../controllers/consultaController.js";
import express from 'express'; 

const router= express.Router();

//Ruta de las consultas 
router.get("/:userId", findConsulta);
router.post("/", newConsulta);


export default router;