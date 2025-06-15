const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Devis = require("../models/devis.model");
const Notification = require("../models/Notification"); // ✅ notification ajoutée

// 📁 Configuration Multer pour les fichiers PDF
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/pdfDevis/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, Date.now() + "-" + baseName + ext);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ["application/pdf"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Seuls les fichiers PDF sont autorisés."));
    }
    cb(null, true);
  },
});

// ➕ Ajouter un devis
router.post("/add", async (req, res) => {
  try {
    const newDevis = new Devis(req.body);
    const saved = await newDevis.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Erreur ajout devis :", error);
    res.status(500).json({ msg: "Erreur lors de l'ajout du devis ❌", error });
  }
});

// ⬆️ Upload PDF + notifier (avec email)
router.put("/upload-pdf/:id", upload.single("pdfFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "Aucun fichier PDF fourni." });
    }

    const updated = await Devis.findByIdAndUpdate(
      req.params.id,
      { devisPDF: req.file.filename, statut: "traité" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Devis introuvable." });
    }

    // ✅ Créer une notification avec email (pas besoin du modèle User)
    await Notification.create({
      userId: updated.email, // ici on stocke l'email du client
      message: `📑 Votre demande de devis a été traitée. Le devis PDF est disponible.`,
    });

    res.status(200).json({ msg: "PDF ajouté avec succès ✅", devis: updated });
  } catch (error) {
    console.error("Erreur lors de l’upload PDF :", error);
    res.status(500).json({ msg: "Erreur lors de l'upload PDF ❌", error });
  }
});

// ❌ Supprimer un devis (et son fichier PDF si présent)
router.delete("/delete/:id", async (req, res) => {
  try {
    const devis = await Devis.findById(req.params.id);
    if (!devis) {
      return res.status(404).json({ msg: "Devis introuvable ❌" });
    }

    if (devis.devisPDF) {
      const pdfPath = path.join(__dirname, "..", "uploads", "pdfDevis", devis.devisPDF);
      fs.unlink(pdfPath, (err) => {
        if (err) console.warn("PDF non supprimé :", err.message);
      });
    }

    await Devis.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Devis supprimé avec succès ✅" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ msg: "Erreur de suppression ❌", error });
  }
});

// 📄 Récupérer tous les devis
router.get("/all", async (req, res) => {
  try {
    const devisList = await Devis.find().sort({ dateCreation: -1 });
    res.status(200).json(devisList);
  } catch (error) {
    console.error("Erreur récupération devis :", error);
    res.status(500).json({ msg: "Erreur lors de la récupération des devis ❌", error });
  }
});

// 🧾 Récupérer les devis d’un client via son email
router.get("/by-email/:email", async (req, res) => {
  try {
    const devis = await Devis.find({ email: req.params.email }).sort({ dateCreation: -1 });
    res.status(200).json(devis);
  } catch (error) {
    console.error("Erreur récupération devis client :", error);
    res.status(500).json({ msg: "Erreur lors de la récupération ❌", error });
  }
});

module.exports = router;
