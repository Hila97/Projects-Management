const mongoose = require ('mongoose')
const schema = mongoose.Schema



var validateEmail = function(email)
{
        var re = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
        return re.test(email)
};
var validatePassword = function(password)
{
        var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        return pass.test(password)
};

const companyEmployeesSchema= new schema(
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
            }
})

const CompanyEmployee = mongoose.model('CompanyEmployee',companyEmployeesSchema)
module.exports = CompanyEmployee