const express = require("express");
const Promotion = require("../models/promotion");
const router = express.Router();

// ✅ Ajouter une promotion
router.post("/add", async (req, res) => {
  try {
    const newPromo = new Promotion({ ...req.body });
    const result = await newPromo.save();
    res.status(201).send({ msg: "Promotion ajoutée ✅", promotion: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Erreur lors de l'ajout ❌" });
  }
});

// ✅ Obtenir toutes les promotions
router.get("/all", async (req, res) => {
  try {
    const promotions = await Promotion.find().populate("articleId"); // 👈 important
    res.status(200).send({ msg: "Liste des promotions", promotions });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Erreur serveur" });
  }
});

// ✅ Modifier une promotion
router.put("/:id", async (req, res) => {
  try {
    const updated = await Promotion.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.send({ msg: "Promotion mise à jour ✅", promotion: updated });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Erreur lors de la mise à jour ❌" });
  }
});

// ✅ Supprimer une promotion
router.delete("/:id", async (req, res) => {
  try {
    await Promotion.findByIdAndDelete(req.params.id);
    res.send({ msg: "Promotion supprimée ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Erreur lors de la suppression ❌" });
  }
});

module.exports = router;
