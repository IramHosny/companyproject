const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

router.get("/:userEmail", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.userEmail);

    if (!email) {
      return res.status(400).json({ msg: "Email manquant" });
    }

    const notifications = await Notification.find({ userId: email }).sort({ date: -1 });

    // ⚠️ Ne renvoie jamais 404 ici — juste une liste vide
    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Erreur récupération notifications :", error);
    return res.status(500).json({ msg: "Erreur serveur notifications" });
  }
});

// 🗑️ Supprimer une notification (optionnel)
router.delete("/:id", async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Notification supprimée ✅" });
  } catch (error) {
    console.error("❌ Erreur suppression notification :", error);
    res.status(500).json({ msg: "Erreur suppression notification" });
  }
});

// ✏️ Marquer une notification comme lue (optionnel - nécessite un champ read: Boolean)
router.put("/read/:id", async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Erreur mise à jour notification :", error);
    res.status(500).json({ msg: "Erreur mise à jour notification" });
  }
});

module.exports = router;
