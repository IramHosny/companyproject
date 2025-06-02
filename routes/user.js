const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const {registerRules,loginRules,validation} = require("../middleware/validator");
const isAuth = require('../middleware/passport');

//register new user "post"
// REGISTER
userRouter.post("/register", registerRules(), validation, async (req, res) => {
  const { name, lastname, adress, phonenumber, email, password, company, tax_number, role } = req.body;

  try {
    const newuser = new User({ name, lastname, adress, phonenumber, email, password, company, tax_number, role });

    // check if email already exists
    const searcheduser = await User.findOne({ email });
    if (searcheduser) {
      return res.status(400).send({ msg: "email already exist" }); // ✅ return ajouté ici
    }

    // hash password
    const salt = 10;
    const gensalt = await bcrypt.genSalt(salt);
    const hashedpassword = await bcrypt.hash(password, gensalt);
    newuser.password = hashedpassword;

    // save user
    const newUserToken = await newuser.save();

    // generate token
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

//get current profile
userRouter.get("/current", isAuth(),(req,res) => {
    res.status(200).send({user:req.user});
})

//update user
userRouter.put("/:_id", async (req, res) => {
    try {
      let result = await User.findByIdAndUpdate(
        { _id: req.params._id },
        { $set: req.body }
      );
      res.send({ msg: " user updated " });
    } catch (error) {
      res.send({ msg: "fail" });
      console.log(error);
    }
  });

//get allusers
userRouter.get("/allusers", async (req, res) => {
  try {
    let result = await User.find();
    res.send({ users: result, msg: "all users " });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});

//delete user 
userRouter.delete("/:_id", async (req, res) => {
  try {
    let result = await User.findByIdAndDelete({ _id: req.params._id });
    res.send({ msg: "user deleted " });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});




module.exports = userRouter; 