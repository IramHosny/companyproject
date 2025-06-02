const mongoose = require("mongoose");
const schema = mongoose.Schema;

const articleSchema = new schema({
    name : {type:String , required:true},
    catégorie : {type:String , required:true},
    description : {type:String , required:true},
    image : {type:String , required:true},
    prix : {type:String , required:true},
    }
  );
  
  const Article = mongoose.model('Article', articleSchema);
  module.exports = Article ;
