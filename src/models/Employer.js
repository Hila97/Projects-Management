const mongoose = require ('mongoose')
const schema = mongoose.Schema
const {FieldOfEmployment} = require("./enums")

var validateEmail = function(email)
{
    var re = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    return re.test(email)
};
var validatePassword = function(password)
{
    var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    console.log(pass.test(password))
    return pass.test(password)

};

const employerSchema = new schema(
    {
        userName:
            {
                type: String,
                unique: true,
                required: 'Please enter Email address',
                validate: [validateEmail, 'Please fill a valid email address'],
                match: [/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/, 'Please fill a valid email address']
            },
        password:
            {
                type: String,
                required: 'Please enter password',
                validate: [validatePassword, 'Please fill a valid password'],
                match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/, 'Please fill a valid password']
            },
        confirmPassword:
            {
                type: String,
                required: true,
                validate: [validatePassword, 'Please fill a valid password'],
                match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/, 'Please fill a valid password']
            },
        fullName:
            {
                type: String,
                required: 'Please enter name'
            },
        companyName:
            {
                type: String,
                required: 'Please enter company name'
            },
        position:
            {
                type: String,
                required: 'Please enter position'
            },
        phone:
            {
                type: String,
                required: 'Please enter phone'
            },
        fieldOfEmployment:
            {
                type: FieldOfEmployment,
                default: FieldOfEmployment.Other
            }
    },{timestamps: true})

const Employer = mongoose.model('Employer',employerSchema)
module.exports = Employer