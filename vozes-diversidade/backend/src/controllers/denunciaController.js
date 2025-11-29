import Denuncia from '../models/denuncia.js';
import { sendDenunciaEmail } from '../services/emailService.js';

export const criarDenuncia = async (req, res) => {
  try {
    console.log("RECEBENDO NOVA DENÚNCIA");
    console.log("Body recebido:", req.body);

    const protocol = Math.random().toString(36).substring(2, 10).toUpperCase();
    console.log("Protocolo gerado:", protocol);

    const novaDenuncia = new Denuncia({
      ...req.body,
      protocol
    });

    console.log("Salvando denúncia no banco...");
    await novaDenuncia.save();
    console.log("Denúncia salva com sucesso!");

    console.log("Chamando função de envio de email...");
    await sendDenunciaEmail(novaDenuncia);
    console.log("Email processado!");

    res.status(201).json({
      message: 'Denúncia enviada com sucesso!',
      protocol,
      novaDenuncia
    });

  } catch (error) {
    console.error("ERRO AO CRIAR DENÚNCIA");
    console.error("Erro completo:", error);
    res.status(500).json({ error: 'Erro ao enviar denúncia.' });
  }
};

export const listarDenuncias = async (req, res) => {
  try {
    const denuncias = await Denuncia.find();
    res.status(200).json(denuncias);
  } catch (error) {
    console.error('Erro ao buscar denúncias:', error);
    res.status(500).json({ error: 'Erro ao buscar denúncias.' });
  }
};