const mongoose = require("mongoose");
const schema = mongoose.Schema

const promotionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  pourcentage: { type: Number, required: true, min: 1, max: 100 },
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("promotion", promotionSchema);
