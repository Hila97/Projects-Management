const mongoose = require ('mongoose');
const schema= mongoose.Schema;
const vacationSchema = new schema({
    workerID:
        {
            type: mongoose.Types.ObjectId,
            ref: 'ContractorWorker'
        },
    departureDate:
        {
            type: Date,
            default: Date.now
        },
    returningDate:
        {
            type: Date,
            default: Date.now
        },

});

module.exports = mongoose.model('Vacation',vacationSchema);

