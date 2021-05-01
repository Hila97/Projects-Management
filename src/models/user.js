const mongoose = require ('mongoose');
const schema= mongoose.Schema;
const usersSchema = new schema({
    username: String,
    password:
        {
            type:String,
            required:true
        }
});

module.exports = mongoose.model('User',usersSchema);

