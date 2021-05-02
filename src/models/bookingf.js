const mongoose = require ('mongoose');
const { Status } = require('./enums');
const schema= mongoose.Schema;
const bookingfSchema = new schema({

    bookingDate:
        {
            type: Date,
            default: Date.now,
        },
    workerID:
        {
            type: mongoose.Types.ObjectId,
            ref: 'ContractorWorker'
        },
    
    startTime:
    {
            type:String,                 

    },
    endTime:        
    {
            type:String,
        
    },
    status:
    {
            type:Status,
            default:Status.FUTURE,
            
    }
    //bookingDate, wid,starttime,end,Status
    // 10-04-22  123456   45   12  future 
});

const bookingf = mongoose.model('bookingf',bookingfSchema)
module.exports = bookingf