import Denuncia from '../models/denuncia.js';

// Criar uma nova denúncia
export const criarDenuncia = async (req, res) => {
  try {
    const protocol = Math.random().toString(36).substring(2, 10).toUpperCase();
    const novaDenuncia = new Denuncia(req.body);
    await novaDenuncia.save();
    res.status(201).json({
      message: 'Denúncia enviada com sucesso!',
      protocol,
      novaDenuncia
    });
  } catch (error) {
    console.error('Erro ao salvar denúncia:', error);
    res.status(500).json({ error: 'Erro ao enviar denúncia.' });
  }
};

// Listar todas as denúncias (para teste)
export const listarDenuncias = async (req, res) => {
  try {
    const denuncias = await Denuncia.find();
    res.status(200).json(denuncias);
  } catch (error) {
    console.error('Erro ao buscar denúncias:', error);
    res.status(500).json({ error: 'Erro ao buscar denúncias.' });
  }
};
