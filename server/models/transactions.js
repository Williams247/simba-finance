const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactions = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  transactionType: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  sender: String,
  receiver: String,
  exchangeRate: Number
},
{ timestamps: true }
);

module.exports = mongoose.model("transactions", transactions);
