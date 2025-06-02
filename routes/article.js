const express = require("express");
const article = require("../models/article");
const articlerouter = express.Router();
// add article
// POST method

articlerouter.post("/addarticle", async (req, res) => {
  try {
    let newarticle = new article({ ...req.body });
    let result = await newarticle.save();
    res.send({ article: result, msg: "successfully added" });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});
// lister article
// Get method
articlerouter.get("/allarticle", async (req, res) => {
  try {
    let result = await article.find();
    res.send({ article: result, msg: "all articles " });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});
// delete article
// Delete method
articlerouter.delete("/:id", async (req, res) => {
  try {
    let result = await article.findByIdAndDelete({ _id: req.params.id });
    res.send({ msg: "article deleted " });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});

// update article
// update method
articlerouter.put("/:id", async (req, res) => {
  try {
    let result = await article.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send({ msg: " article updated " });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});
module.exports = articlerouter;