import express from "express";
import { criarDenuncia, listarDenuncias } from "../controllers/denunciaController.js";

const router = express.Router();

router.post("/denuncia", criarDenuncia);

router.get("/denuncia", listarDenuncias);

export default router;
