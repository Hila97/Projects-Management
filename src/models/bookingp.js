const mongoose = require ('mongoose');
const { Status } = require('./enums');
const schema= mongoose.Schema;
const bookingpSchema = new schema({

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
            default:Status.CURRENT,
            
    }
    //bookingDate, wid,starttime,end,Status
    // 10-04-22  123456   45   12  future 
});

const bookingp = mongoose.model('bookingp',bookingpSchema)
module.exports = bookingp