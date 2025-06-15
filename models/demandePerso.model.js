const mongoose = require("mongoose");
const schema = mongoose.Schema
const demandePersoSchema = new mongoose.Schema({
  piece: { type: String, required: true },
  couleur: { type: String, required: true },
  quantite: { type: Number, required: true },
  dimensions: { type: String, required: true },
  dateLimite: { type: Date, required: true },
  image: { type: String },
  emailClient: { type: String, required: true }, 
  dateCreation: { type: Date, default: Date.now },
  statut: {
  type: String,
  enum: ["en attente", "acceptée", "refusée"],
  default: "en attente"
},
});

module.exports = mongoose.model("DemandePerso", demandePersoSchema);
