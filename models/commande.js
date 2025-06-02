const  mongoose = require ('mongoose')
const schema = mongoose.Schema
const orderSchema = new schema({

  orderItems: {type: Array, require: true,},
  orderTotal: {type: Number, require: true,},
  orderStatus: {type: String,require: true},
  current_user: {type: String,require: true},
  user_adress : {type: String,require: true},
  user_fullname : {type: String,require: true},
  user_gsm :{type: Number,require: true},
  date_v : {type:Date,require:true},

})

const Order = mongoose.model('Order', orderSchema);
  module.exports = Order ;