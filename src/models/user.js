const mongoose = require ('mongoose');
const {Days} = require("./enums");
const schema= mongoose.Schema;
const usersSchema = new schema({
    username: String,
    password: String,
    name:{ type:Days, default:Days.SUNDAY}

});

//const User = mongoose.model('User',usersSchema)
module.exports = mongoose.model('User',usersSchema);

