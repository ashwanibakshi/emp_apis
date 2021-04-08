const mongoose  = require('mongoose');

const empAdd = new mongoose.Schema({
    empid:{
        type:mongoose.Types.ObjectId,
        required:true,
        unique:true
    },
    caddress:{
        type:String,
        required:true,
    },
    paddress:{
      type:String,
      required:true
    },
    zipcode:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('empaddress',empAdd);