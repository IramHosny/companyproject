const express = require("express");
const order = require("../models/commande");
const orderRouter = express.Router();

//get all orders
orderRouter.get("/allorders", async (req, res) => {
    try {
      let result = await order.find();
      res.send({ order: result, msg: "all orders " });
    } catch (error) {
      res.send({ msg: "fail" });
      console.log(error);
    }
  });

//add new order
orderRouter.post("/addorder", async (req, res) => {
    try {
      let neworder = new order({ ...req.body });
      let result = await neworder.save();
      res.send({ order: result, msg: "new order added" });
    } catch (error) {
      res.send({ msg: "fail" });
      console.log(error);
    }
  });

//update order
orderRouter.put("/:_id", async (req, res) => {
    try {
      let result = await order.findByIdAndUpdate(
        { _id: req.params._id },
        { $set: {orderStatus:"acceptée"} }
      );
      res.send({ msg: " order updated " });
    } catch (error) {
      res.send({ msg: "fail" });
      console.log(error);
    }
  });

  //delete order
  orderRouter.delete("/:_id", async (req, res) => {
    try {
      let result = await order.findByIdAndDelete({ _id: req.params._id });
      res.send({ msg: "order deleted " });
    } catch (error) {
      res.send({ msg: "fail" });
      console.log(error);
    }
  });
  
module.exports = orderRouter;