const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path"); // ✅ pour gérer les chemins absolus
require("dotenv").config();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Connexion à la base de données
const db_connect = require("./connect_db");
db_connect();

// ✅ Servir les images du dossier "uploads" avec un chemin absolu
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 
// Ce chemin permet d'accéder à http://localhost:5000/uploads/nomImage.jpg

// ✅ Routes principales
app.use("/user", require("./routes/user"));
app.use("/article", require("./routes/article"));
app.use("/commande", require("./routes/commande"));
app.use("/promotion", require("./routes/promotion"));
app.use("/devis", require("./routes/devisRoutes"));
app.use("/demandeperso", require("./routes/demandePersoRoutes"));
app.use("/notifications", require("./routes/notification"));

// ✅ Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err
    ? console.error("❌ Erreur serveur :", err)
    : console.log(`✅ Server is running on port ${PORT}!`)
);
