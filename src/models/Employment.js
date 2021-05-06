const mongoose = require ('mongoose');
const schema= mongoose.Schema
const {FieldOfEmployment} = require("./enums");
const {Status}=require('./enums')
const employmentSchema = new schema({
    bookingDate:
        {
            type: Date,
            default: Date.now
        },
    workDate:
        {
            type: Date,
            default: Date.now
        },
    employerID:
        {
            type: mongoose.Types.ObjectId,
            ref: 'Employer',
            require: true
        },
    workerID:
        {
            type: mongoose.Types.ObjectId,
            ref: 'contractorWorker',
            require: true
        },
    field:
        {
            type:FieldOfEmployment,
            default:FieldOfEmployment.Other
        },
    startTime:
        {
            type:Date
        },
    endTime:
        {
            type:Date
        },
    status:
        {
            type:Status,
            default:Status.FUTURE
        },
    jobDescription:
        {
            String
        }
});

module.exports = mongoose.model('Employment',employmentSchema);