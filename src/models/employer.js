const mongoose = require ('mongoose')
const schema = mongoose.Schema

const employerSchema = new schema({
    userName:
        {
            type: String,
            required: true
        },
    password:
        {
            type: String,
            required: true
        },
    fullName:
        {
            type: String,
            required: true
        },
    companyName:
        {
            type: String,
            required: true
        },
    position:
        {
            type: String,
            required: true
        },
    phone:
        {
            type: String,
            required: true
        },
    fieldOfEmployment:
        {
            type: String,
            required: true
        },
    password:
        {
            type: String,
            required: true
        },
},{timestamps: true})

const Employer = mongoose.model('Employer',employerSchema)
module.exports = Employer