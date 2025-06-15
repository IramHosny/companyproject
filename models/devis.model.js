const mongoose = require("mongoose");

const devisSchema = new mongoose.Schema({
  typeDemande: {
    type: String,
    enum: ["standard", "personnalisee"],
    required: true,
  },
  nom: String,
  prenom: String,
  societe: String,
  email: { type: String, required: true },
  telephone: String,

  articles: [
    {
      reference: { type: String, required: true },
      quantite: { type: Number, required: true },
    }
  ],

  dateLivraisonSouhaitee: Date,

  devisPDF: { type: String, default: null },
  statut: { type: String, enum: ["en attente", "en cours", "traité"], default: "en attente" },

  dateCreation: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Devis", devisSchema);
