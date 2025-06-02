const express = require ("express");
const app = express ();
const cors = require('cors');
app.use(express.json());
const db_connect = require("./connect_db");
app.use(cors());
require("dotenv").config();
//connexion db
db_connect();


//routes
app.use("/user", require("./routes/user"));
app.use("/article", require("./routes/article"));
app.use("/commande", require("./routes/commande"));

//server
const PORT = process.env.PORT ;
app.listen( PORT , 
    (err) => err?console.log(err): console.log(`server is running on ${PORT}!`)
    );
