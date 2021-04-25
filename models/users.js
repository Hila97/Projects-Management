const mongoose = require ('mongoose')
const schema = mongoose.Schema

const usersSchema = new schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true})

const Users = mongoose.model('Users',usersSchema)
module.exports = Users

