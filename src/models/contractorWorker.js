const mongoose = require ('mongoose')

const contractorSchema = mongoose.schema ({
    username:String
})
    /*
    ID: {
        type: Number,
        minLength: 9,
        required: true
    },
    firstName: {
        type: String,
        maxLength: 20,
        required: true
    },
    lastName: {
        type: String,
        maxLength: 20
    },
    telephone: {
        type: String
        maxLength: 20
    },
    email: {
        type:
        required: true
},
dateOfBirth: {
    type: Date ,
        required: true
},

areaOfResidence: {
    type: String ,
    //required:true
},

fieldOfEmployment:{
    type: FieldOfEmployment ,
        required: true

},

workingDays:{
    type: Days,
        required:true
},

hourlyWage: {
    type: Number,
        required:true

},

bankAccount:[{
    type: mongoose.Types.ObjectId , //?
    required: true

}]

rating:{
    type: Number
},

resume:{
    type: File

},


})

     */
module.exports=mongoose.model('ContractorWorker', contractorSchema)