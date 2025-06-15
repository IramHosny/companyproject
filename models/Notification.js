const mongoose = require("mongoose");
const schema = mongoose.Schema

const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ici on garde l'email
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);
