const mongoose = require("mongoose");


const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    prise: { type: Number, required: true },
    user_id : {type:mongoose.Schema.Types.ObjectId, ref:"user",required:true}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


const Product = mongoose.model("product",productSchema);

module.exports = Product;