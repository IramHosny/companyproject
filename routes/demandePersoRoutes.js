const express = require("express");
const router = express.Router();
const multer = require("multer");
const DemandePerso = require("../models/demandePerso.model");
const Notification = require("../models/Notification"); // ✅ ajouté

// 📁 Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/demandesPerso/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ➕ Ajouter une demande personnalisée
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const demande = new DemandePerso({
      ...req.body,
      image: req.file ? req.file.filename : null,
      dateCreation: new Date(),
    });
    const saved = await demande.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ msg: "Erreur ajout ❌", err });
  }
});

// 📄 Récupérer les demandes d'un client via email
router.get("/by-email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const demandes = await DemandePerso.find({ emailClient: email }).sort({ dateCreation: -1 });
    res.status(200).json(demandes);
  } catch (err) {
    res.status(500).json({ msg: "Erreur récupération ❌", err });
  }
});

// 🔁 Récupérer toutes les demandes
router.get("/all", async (req, res) => {
  try {
    const demandes = await DemandePerso.find().sort({ dateCreation: -1 });
    res.status(200).json(demandes);
  } catch (err) {
    res.status(500).json({ msg: "Erreur récupération ❌", err });
  }
});

// ✏️ Modifier le statut d'une demande + notifier
router.put("/update-statut/:id", async (req, res) => {
  try {
    const updated = await DemandePerso.findByIdAndUpdate(
      req.params.id,
      { statut: req.body.statut },
      { new: true }
    );

    // ✅ Créer une notification avec l’email du client
    if (updated?.emailClient) {
      await Notification.create({
        userId: updated.emailClient, // on stocke l'email du client
        message: `🛠️ Votre demande personnalisée a été mise à jour : ${req.body.statut}`,
      });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Erreur mise à jour statut ❌", err });
  }
});

// 🗑️ Supprimer une demande personnalisée
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await DemandePerso.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: "Demande introuvable ❌" });
    }
    res.status(200).json({ msg: "Demande supprimée ✅", deleted });
  } catch (err) {
    res.status(500).json({ msg: "Erreur suppression ❌", err });
  }
});

module.exports = router;
