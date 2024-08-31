const mongoose = require('mongoose');

const adPostDetailsSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    image:{
        type:String
    }

});

const adPostDetails = mongoose.model('adPostDetails',adPostDetailsSchema);
module.exports = adPostDetails;