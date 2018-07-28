const mongoose = require('mongoose');

const User = mongoose.Schema({
    id : {type : String, required : true, unique : true, lowercase : true, trim : true},
    pw : {type : String, required : true, lowercase : true, trim : true}
});

module.exports = mongoose.model('User', User);
