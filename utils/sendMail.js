// utils/sendMail.js

const nodemailer = require('nodemailer');

// ✅ Configuration du transporteur (SMTP Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,   // Doit être défini dans .env
    pass: process.env.MAIL_PASS,   // Mot de passe d'application (non le mot de passe Gmail direct)
  },
});

/**
 * Envoie un email informant le client du changement de statut de sa commande
 * @param {string} to - Email du client
 * @param {string} user_fullname - Nom complet du client
 * @param {string} orderStatus - Nouveau statut (acceptée, refusée, etc.)
 * @param {string} order_id - ID de la commande
 */
const sendOrderStatusMail = (to, user_fullname, orderStatus, order_id) => {
  const mailOptions = {
    from: `"Société Abdeddaiem groupe " <${process.env.MAIL_USER}>`,
    to: to,
    subject: `🛒 Mise à jour de votre commande #${order_id}`,
    html: `
      <h3>Bonjour ${user_fullname},</h3>
      <p>Le statut de votre commande <strong>${order_id}</strong> a été mis à jour.</p>
      <p><strong>Nouveau statut :</strong> <span style="color:blue">${orderStatus}</span></p>
      <p>Merci pour votre confiance.</p>
      <hr/>
      <small>Ceci est un message automatique. Veuillez ne pas y répondre.</small>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendOrderStatusMail;
