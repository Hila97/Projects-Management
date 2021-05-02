const mongoose = require ('mongoose');
const schema= mongoose.Schema;
const bookingpSchema = new schema({

bookingDate:
    {
        type: Date,
        default: Date.now
    },
workerID:
    {
        type: mongoose.Types.ObjectId,
        ref: 'ContractorWorker'
    },
firstName: 
{
        type: String,
        maxLength: 20,
        required: true
},
lastName: 
{
        type: String,
        maxLength: 20
},
telephone:
{
        type: String,
        maxLength: 20
},
rating:
{
    type: Number
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
});

const bookingp = mongoose.model('bookingp',bookingpSchema)
module.exports = bookingp