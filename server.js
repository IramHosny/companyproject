const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors());

// Connexion à la base de données
const db_connect = require("./connect_db");
db_connect();

// ✅ Routes
app.use("/user", require("./routes/user"));
app.use("/article", require("./routes/article"));
app.use("/commande", require("./routes/commande"));
app.use("/promotion", require("./routes/promotion"));
app.use("/devis", require("./routes/devisRoutes"));
app.use("/uploads", express.static("uploads")); 
app.use("/demandeperso", require("./routes/demandePersoRoutes"));
app.use("/notifications", require("./routes/notification"));

// ✅ Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`✅ Server is running on port ${PORT}!`)
);
