const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const userRouter = express.Router();

const { registerRules, loginRules, validation } = require("../middleware/validator");
const isAuth = require('../middleware/passport');

// REGISTER
userRouter.post("/register", registerRules(), validation, async (req, res) => {
  const { name, lastname, adress, phonenumber, email, password, company, tax_number, role } = req.body;

  try {
    const newuser = new User({ name, lastname, adress, phonenumber, email, password, company, tax_number, role });

    const searcheduser = await User.findOne({ email });
    if (searcheduser) {
      return res.status(400).send({ msg: "email already exist" });
    }

    const salt = 10;
    const gensalt = await bcrypt.genSalt(salt);
    const hashedpassword = await bcrypt.hash(password, gensalt);
    newuser.password = hashedpassword;

    const newUserToken = await newuser.save();

    const payload = {
      _id: newUserToken._id,
      name: newUserToken.name,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });

    return res.status(200).send({ newUserToken, msg: "user is saved", token: `Bearer ${token}` }); 
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "can not save the user" }); 
  }
});

// LOGIN
userRouter.post("/login", loginRules(), validation, async (req, res) => {
  const { email, password } = req.body;

  try {
    const searcheduser = await User.findOne({ email });

    if (!searcheduser) {
      return res.status(400).send({ msg: "verifier vos info" });
    }

    const match = await bcrypt.compare(password, searcheduser.password);
    if (!match) {
      return res.status(400).send({ msg: "verifier vos info" });
    }

    const payload = {
      _id: searcheduser._id,
      name: searcheduser.name,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });

    return res.status(200).send({ user: searcheduser, msg: "success", token: `Bearer ${token}` });
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "can not find the user" });
  }
});

// GET current user
userRouter.get("/current", isAuth(), (req, res) => {
  res.status(200).send({ user: req.user });
});

// UPDATE user
userRouter.put("/:_id", async (req, res) => {
  try {
    await User.findByIdAndUpdate({ _id: req.params._id }, { $set: req.body });
    res.send({ msg: "user updated" });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});

// GET all users
userRouter.get("/allusers", async (req, res) => {
  try {
    const result = await User.find();
    res.send({ users: result, msg: "all users" });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});

// DELETE user
userRouter.delete("/:_id", async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.params._id });
    res.send({ msg: "user deleted" });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});


// 🔐 MOT DE PASSE OUBLIÉ

// Envoi d’email avec lien de réinitialisation
userRouter.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable." });

    const token = jwt.sign({ id: user._id }, "secret_reset", { expiresIn: "15m" });
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // 📧 Remplacez ici par votre email
        pass: process.env.MAIL_PASS, // 🔐 Mot de passe d'application Gmail
      },
    });

    await transporter.sendMail({
      from: '"Support Abdedaiem" <hosnyiram18@gmail.com>',
      to: email,
      subject: "Réinitialisation de mot de passe",
      html: `<p>Bonjour,<br/>Cliquez ici pour réinitialiser votre mot de passe :<br/><a href="${resetLink}">${resetLink}</a></p>`,
    });

    res.json({ message: "Email de réinitialisation envoyé avec succès." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email." });
  }
});

// Mise à jour du mot de passe à partir du lien
userRouter.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, "secret_reset");
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });
    res.json({ message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Lien invalide ou expiré." });
  }
});

module.exports = userRouter;
