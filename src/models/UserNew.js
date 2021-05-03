const mongoose = require('mongoose')

const NewUserSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    }
)

const model = mongoose.model('UserNew', NewUserSchema)

module.exports = model