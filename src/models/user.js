const mongoose = require ('mongoose');
const schema= mongoose.Schema;
const usersSchema = new schema({
    username: String,
    password: String
});

module.exports = mongoose.model('User',usersSchema);

