const mongoose = require("mongoose");
const schema = mongoose.Schema;

const articleSchema = new schema({
  name: { type: String, required: true },
  categorie: { type: String, required: true },
  description: { type: String, required: true },
  prix: { type: String, required: true },

  reference: {
    type: String,
    unique: true,
    default: function () {
      const prefix = "ART-";
      const randomPart = Math.random().toString(36).substr(2, 6).toUpperCase();
      return prefix + randomPart;
    }
  },

  images: {
    type: [String],
    required: true,
    validate: [arr => arr.length <= 4, 'Maximum 4 images autorisées']
  },

  image360Path: {
    type: String,
    default: ""
  },

  image360Count: {
    type: Number,
    default: 0
  },

  image360Files: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Article', articleSchema);
