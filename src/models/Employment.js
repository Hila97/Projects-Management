const mongoose = require ('mongoose');
const schema= mongoose.Schema
const {FieldOfEmployment} = require("./enums");
const {Status}=require('./enums')
const {confirmation}=require('./enums')
const employmentSchema = new schema({
    bookingDate:
        {
            type: Date,
            default: Date.now
        },
    workDate:
        {
            type: Date,
            //default: Date.now
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
            type:Date,
            default:Date.now
        },
    endTime:
        {
            type:Date,
            default:Date.now
        },
    status:
        {
            type:Status,
            default:Status.FUTURE
        },
    jobDescription:
        {
            type:String
        },
    confirmation:
        {
            type:confirmation,
            default:confirmation.PENDING
        },
    rank:
        {
            type:Number,
            min:0,
            max:5,
            default:0
        },
    temp:
        {
            type:Number,
            default:0
        }
});

module.exports = mongoose.model('Employment',employmentSchema);
