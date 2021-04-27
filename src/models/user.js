const mongoose = require ('mongoose')
const schema = mongoose.Schema

const usersSchema = new schema({
    username: {
        type: String,
        require:true
    },
    password: {
        type: String,
        require:true
    }
},{timestamps: true})

const User = mongoose.model('User',usersSchema)
module.exports = User

