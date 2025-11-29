import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import formRoutes from "./src/routes/formRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", formRoutes);

const mongoURI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY || "meusegredo123";
const PORT = process.env.PORT || 5000;

if (!mongoURI) {
  console.error("ERRO: MONGO_URI não está definido no .env");
  process.exit(1);
}

console.log("EMAIL_USER:", process.env.EMAIL_USER || "NÃO CONFIGURADO");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Configurado" : "NÃO CONFIGURADO");
console.log("MONGO_URI:", mongoURI ? "Configurado" : "NÃO CONFIGURADO");

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  });

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Usuário e senha são obrigatórios" });
  }
  
  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ success: true, token });
  }
  
  return res.status(401).json({ success: false, message: "Credenciais inválidas" });
});

app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Acesso autorizado ao dashboard", user: req.user });
});

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) {
    return res.status(403).json({ message: "Token não fornecido" });
  }
  
  const token = authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(403).json({ message: "Token mal formatado" });
  }
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }
    req.user = decoded;
    next();
  });
}

app.get("/", (req, res) => {
  res.send("API do projeto Vozes da Diversidade está rodando!");
});

app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err);
  res.status(500).json({ error: "Erro interno do servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});