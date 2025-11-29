import nodemailer from "nodemailer";

export const sendDenunciaEmail = async (denuncia) => {
  try {
    console.log("INICIANDO ENVIO DE EMAIL");
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS existe:", !!process.env.EMAIL_PASS);
    console.log("Protocolo da denúncia:", denuncia.protocol);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Credenciais de e-mail não configuradas no .env");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log("Verificando conexão com servidor SMTP...");
    await transporter.verify();
    console.log("Conexão SMTP verificada com sucesso!");

    const mailOptions = {
      from: `"Projeto de Extensão LGBTQIA+" <${process.env.EMAIL_USER}>`,
      to: "casadadriele@gmail.com",
      subject: `Nova denúncia recebida – Protocolo ${denuncia.protocol}`,
      html: `
        <h2>Nova denúncia enviada</h2>

        <p><strong>Protocolo:</strong> ${denuncia.protocol}</p>
        <p><strong>Tipos de ocorrência:</strong> ${denuncia.occurenceType.join(", ")}</p>
        <p><strong>Descrição:</strong> ${denuncia.description}</p>
        <p><strong>Data da ocorrência:</strong> ${denuncia.date}</p>
        <p><strong>Local:</strong> ${denuncia.location}</p>
        
        <hr>

        <h3>Informações de suporte</h3>
        <p><strong>Deseja suporte?</strong> ${denuncia.wantsSupport ? "Sim" : "Não"}</p>

        ${
          denuncia.wantsSupport
            ? `
            <p><strong>Método de contato:</strong> ${denuncia.contactMethod}</p>
            <p><strong>E-mail:</strong> ${denuncia.contactEmail || "Não informado"}</p>
            <p><strong>Telefone:</strong> ${denuncia.contactPhone || "Não informado"}</p>
            <p><strong>Horário preferido:</strong> ${denuncia.contactPreferredTime || "Não informado"}</p>
          `
            : ""
        }

        <hr>

        <p><strong>Enviado em:</strong> ${new Date().toLocaleString("pt-BR")}</p>
      `
    };

    console.log("Enviando email para:", mailOptions.to);
    const info = await transporter.sendMail(mailOptions);
    console.log("EMAIL ENVIADO COM SUCESSO!");
    console.log("Message ID:", info.messageId);
    console.log("=== FIM DO ENVIO ===");
    
    return info;

  } catch (error) {
    console.error("ERRO NO ENVIO DE EMAIL");
    console.error("Tipo do erro:", error.name);
    console.error("Mensagem:", error.message);
    console.error("Stack:", error.stack);
    console.error("FIM DO ERRO");
    throw error;
  }
};