const mongoose = require("mongoose");

const vaccinationSchema = new mongoose.Schema({
  bid:{
    type:Number,
    required:true
  },
  vacname: { 
    type: String,
    required: true 
  },
  vaccinator: { 
    type: String, 
    required: true 
  },
  bottle_code: { 
    type: String,
    required:true,
    unique:true 
  },
  dateTime:{
    date:{
      type: String,
      required: true
    },
    time:{
      type: String,
      required: true
    }
  },
  location: { 
    type: String 
  }
});
module.exports = mongoose.model("Vaccination",vaccinationSchema);