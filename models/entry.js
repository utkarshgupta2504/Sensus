const mongoose = require("mongoose");

//////////////////////////////////////
//          Entry Schema            //
//////////////////////////////////////

const entrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      required: true,
      default: "rgba(255,255,255,1)",
    },
    createDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    updateDate: {
      type: Date,
      default: Date.now(),
    },
    //H, N, S ---> Happy, Neutral, Sad
    category: {
      type: String,
      required: true,
      default: "N",
    },
  },
  {
    timestamps: true,
  }
);

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
