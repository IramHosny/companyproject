const express = require("express");
const articlerouter = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const article = require("../models/article");

// 📁 Créer un dossier dynamique pour les images 360°
const generate360Folder = () => {
  const folderName = `uploads/360/article-${Date.now()}`;
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, { recursive: true });
  }
  return folderName;
};

// 🎯 Configurer multer pour gérer les images normales + 360°
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "images360") {
      if (!req.folderPath360) {
        const folderPath = generate360Folder();
        req.image360Path = `/${folderPath}/`;
        req.folderPath360 = folderPath;
        req.image360Index = 1;
      }
      cb(null, req.folderPath360);
    } else {
      cb(null, "uploads/");
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (file.fieldname === "images360") {
      cb(null, `image-${req.image360Index++}${ext}`);
    } else {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
  },
});

const upload = multer({ storage });

/* ✅ POST : Ajouter un article */
articlerouter.post(
  "/addarticle",
  upload.fields([
    { name: "images", maxCount: 4 },
    { name: "images360", maxCount: 36 },
  ]),
  async (req, res) => {
    try {
      const files = req.files || {};

      const imagePaths = (files["images"] || []).map(
        (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );

      const images360Raw = files["images360"] || [];
      const image360Count = images360Raw.length;
      const image360Path = image360Count > 0 ? req.image360Path : "";

      const image360Files = images360Raw.map(
        (file) => `${req.protocol}://${req.get("host")}${req.image360Path}${file.filename}`
      );

      const newarticle = new article({
        ...req.body,
        images: imagePaths,
        image360Path,
        image360Count,
        image360Files,
      });

      const result = await newarticle.save();
      res.status(201).send({ article: result, msg: "✅ Article ajouté avec succès" });
    } catch (error) {
      console.error("Erreur ajout article :", error);
      res.status(500).send({ msg: "❌ Erreur serveur", error: error.message });
    }
  }
);

/* ✅ GET : Tous les articles */
articlerouter.get("/allarticle", async (req, res) => {
  try {
    const articles = await article.find();
    res.status(200).send({ msg: "✅ Articles récupérés", article: articles });
  } catch (error) {
    res.status(500).send({ msg: "❌ Erreur serveur", error: error.message });
  }
});

/* ✅ DELETE : Supprimer un article */
articlerouter.delete("/:id", async (req, res) => {
  try {
    await article.findByIdAndDelete(req.params.id);
    res.send({ msg: "🗑️ Article supprimé" });
  } catch (error) {
    res.status(500).send({ msg: "❌ Erreur serveur", error: error.message });
  }
});

/* ✅ PUT : Modifier un article */
articlerouter.put(
  "/:id",
  upload.fields([
    { name: "images", maxCount: 4 },
    { name: "images360", maxCount: 36 },
  ]),
  async (req, res) => {
    try {
      const files = req.files || {};
      const updateData = { ...req.body };

      // 📸 Nouvelles images normales
      if (files["images"]?.length) {
        updateData.images = files["images"].map(
          (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
        );
      }

      // 🔄 Nouvelles images 360°
      if (files["images360"]?.length) {
        updateData.image360Count = files["images360"].length;
        updateData.image360Path = req.image360Path;
        updateData.image360Files = files["images360"].map(
          (file) => `${req.protocol}://${req.get("host")}${req.image360Path}${file.filename}`
        );
      }

      const updated = await article.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
      res.send({ msg: "✏️ Article modifié", article: updated });
    } catch (error) {
      console.error("Erreur modification article :", error);
      res.status(500).send({ msg: "❌ Erreur serveur", error: error.message });
    }
  }
);

/* ✅ GET : Lister images 360° (optionnel) */
articlerouter.get("/images360", (req, res) => {
  const folder = req.query.folder;
  if (!folder) return res.status(400).send({ msg: "❌ Dossier non spécifié" });

  const folderPath = path.join(__dirname, "..", folder);
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Erreur lecture dossier 360°:", err);
      return res.status(500).send({ msg: "❌ Erreur lecture dossier" });
    }

    const imageUrls = files
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .sort()
      .map(file => `${req.protocol}://${req.get("host")}${folder}/${file}`);

    res.send(imageUrls);
  });
});

module.exports = articlerouter;
