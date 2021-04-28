const mongoose = require ('mongoose');
const schema= mongoose.Schema;
const usersSchema = new schema({
    username: String,
    password: String
});

//const User = mongoose.model('User',usersSchema)
module.exports = mongoose.model('User',usersSchema);

