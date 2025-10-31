import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000; // Porta do backend
const SECRET_KEY = "meusegredo123"; // Ideal guardar em variável de ambiente

// Rota de login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Exemplo fixo - pode ser trocado depois para buscar no bd
  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: "Credenciais inválidas" });
});

// Rota protegida de exemplo
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Acesso autorizado ao dashboard" });
});

// Middleware para verificar token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });
    req.user = decoded;
    next();
  });
}

app.get('/', (req, res) => {
  res.send('Servidor backend funcionando!');
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
