const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Agent = new Schema({
    name : [String],
    address : String
});

Agent.statics.create = function(splitName, address){
    let rating = new this({
        name : splitName,
        address : address
    });

    return rating.save();
};




module.exports = mongoose.model("Agent", Agent);