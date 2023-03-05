const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slogan: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  contacts:[{type:String,required:true}]
});

module.exports = mongoose.models.brand || mongoose.model("brand", brandSchema);
