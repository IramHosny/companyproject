const Devis = require('../models/devis.model');

// Ajouter un devis (client)
exports.addDevis = async (req, res) => {
  try {
    const newDevis = new Devis(req.body);
    const savedDevis = await newDevis.save();
    res.status(201).json(savedDevis);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du devis", error });
  }
};

// Récupérer tous les devis (admin)
exports.getAllDevis = async (req, res) => {
  try {
    const devisList = await Devis.find().sort({ dateCreation: -1 });
    res.status(200).json(devisList);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des devis", error });
  }
};

// Upload d’un PDF (admin)
exports.uploadPDF = async (req, res) => {
  try {
    const devisId = req.params.id;
    const filePath = req.file.filename;

    const updated = await Devis.findByIdAndUpdate(
      devisId,
      { devisPDF: filePath, statut: "traité" },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Devis introuvable" });

    res.status(200).json({ message: "PDF uploadé avec succès", devis: updated });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'upload", error });
  }
};
exports.getMyDevis = async (req, res) => {
  try {
    const email = req.user?.email;
    if (!email) return res.status(400).json({ message: "Email utilisateur manquant" });

    const devisList = await Devis.find({ email }).sort({ dateCreation: -1 });
    res.status(200).json(devisList);
  } catch (error) {
    res.status(500).json({ message: "Erreur récupération devis du client", error });
  }
};