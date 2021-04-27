const mongoose = require ('mongoose')
var Days= {Sunday:1 , Monday:2 ,Tuesday:3,Wednesday:4 ,Thursday:5 ,Friday:6}
var FieldOfEmployment={
    ElectronicsAndElectricity:0,
    FashionAndTextiles:1,
    SecurityAndSafety:2,
    ConstructionInfrastructureAndRealEstate:3,
    GraphicsDesignAndArt:4,
    EducationAndTraining:5,
    AccountingAndFinance:6,
    LogisticsProcurementAndShipping:7,
    RestaurantsFoodAndEvents:8,
    Retail:9,
    MedicineAndHealth:10,
    marketingAndAdvertising:11,
    CustomerService:12,
    TransportAndVehicle:13,
    TourismAndHotels:14,
    IndustryAndManagement:15,
    Sales:16
}

const contractorSchema = mongoose.schema ({
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
module.exports=mongoose.model('contractorWorker', contractorSchema)