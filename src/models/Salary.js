const mongoose = require ('mongoose');
const schema= mongoose.Schema;
const salarySchema = new schema(
{
    workerID:
        {
            type: mongoose.Types.ObjectId,
            ref: 'ContractorWorker'
        },
    date:
        {
            type: Date,
            default: Date.now
        },
    totalSalary:
        {
            type:Number,
            min:0,
            default:0
        }
});

module.exports = mongoose.model('Salary',salarySchema);

