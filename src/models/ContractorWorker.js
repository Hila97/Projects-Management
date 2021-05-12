const mongoose = require ('mongoose')
const schema= mongoose.Schema;
const {FieldOfEmployment} = require("./enums");
const {AreaOfResidence} = require("./enums");
const {Days} = require("./enums");

var validateEmail = function(userName)
{
    var re = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    return re.test(userName)
};

var validateID = function(ID){
    var valId=/^(\d\d\d\d\d\d\d\d\d)$/;
    return valId.test(ID)

};

var validatePassword = function(password)
{
    var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return pass.test(password)
};

const contractorSchema = new schema ({
    ID: {
        type: Number,
        unique: true,
        validate:[validateID, 'Please fill a valid ID'],
        match: [/^(\d\d\d\d\d\d\d\d\d)$/, 'Please fill a valid ID'],
        required: true
    },
    firstName: {
        type: String,
        maxLength:15,
        //required: true
    },
    lastName: {
        type: String,
        maxLength:15,
        //required: true
    },
    telephone: {
        type: String,
       // required: true
    },

    password: {
        type: String,
        validate:[validatePassword, 'Please fill a valid password'],
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/, 'Please fill a valid password'],
        required: true
    },

    userName: {
        type: String,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/, 'Please fill a valid email address']
    },

    dateOfBirth: {
        type: Date ,
// required: true
    },
    areaOfResidence: {
        type:AreaOfResidence ,
        //required:true
    },
    fieldOfEmployment:{
        type: FieldOfEmployment ,
        //required: true

    },
    workingDays:{
        type: Object,
// required:true,
            Sunday :{ type: Boolean},
            Monday :{ type: Boolean},
            Tuesday :{ type: Boolean},
            Wednesday:{ type: Boolean},
            Thursday :{ type: Boolean},
            Friday: {type: Boolean}
    },
    hourlyWage: {
        type: Number,
        //required:true
    },
    bankAccount :{
        bankName:{type:String},
        branch:{type:Number},
        accountNumber:{type:Number}
         },

    rating:{
        type: Number,
        default:0
    },
    Experience:{
        type:Number,
        default:0
    }
})
module.exports=mongoose.model('contractorWorker', contractorSchema)
