const express = require("express");
const router = express.Router();
const Order = require("../models/commande");
const Notification = require("../models/Notification");
const sendOrderStatusMail = require("../utils/sendMail");

// ✅ GET - récupérer toutes les commandes
router.get("/allorders", async (req, res) => {
  try {
    const result = await Order.find();
    res.status(200).send({ order: result, msg: "✅ Liste des commandes récupérée" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "❌ Échec récupération commandes" });
  }
});

// ✅ POST - ajouter une nouvelle commande
router.post("/addorder", async (req, res) => {
  try {
    const newOrder = new Order({ ...req.body });
    const result = await newOrder.save();
    res.status(201).send({ order: result, msg: "✅ Nouvelle commande ajoutée" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "❌ Échec ajout commande" });
  }
});

// ✅ PUT - mise à jour du statut + mail + notification (email dans userId)
router.put("/:_id", async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const orderToUpdate = await Order.findById(req.params._id);
    if (!orderToUpdate) {
      return res.status(404).send({ msg: "❌ Commande non trouvée" });
    }

    await Order.findByIdAndUpdate(req.params._id, {
      $set: { orderStatus },
    });

    // ✅ Envoi du mail
    await sendOrderStatusMail(
      orderToUpdate.current_user,
      orderToUpdate.user_fullname,
      orderStatus,
      orderToUpdate._id
    );

    // ✅ Notification avec email (pas ObjectId)
    await Notification.create({
      userId: orderToUpdate.current_user, // email directement
      message: `📦 Votre commande ${orderToUpdate._id} a été mise à jour : ${orderStatus}`,
    });

    res.status(200).send({ msg: "✅ Statut mis à jour, email et notification envoyés" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "❌ Erreur lors de la mise à jour du statut" });
  }
});

// ✅ DELETE - supprimer une commande
router.delete("/:_id", async (req, res) => {
  try {
    await Order.findByIdAndDelete({ _id: req.params._id });
    res.status(200).send({ msg: "✅ Commande supprimée" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "❌ Échec suppression commande" });
  }
});

module.exports = router;
