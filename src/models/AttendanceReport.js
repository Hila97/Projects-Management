const mongoose = require ('mongoose');
const schema= mongoose.Schema;
const attendanceReportSchema = new schema({
   employmentID:
        {
            type: mongoose.Types.ObjectId,
            ref: 'Employment'
        },
    contractorWorkerID:
        {
            type: mongoose.Types.ObjectId,
            ref: 'ContractorWorker'
        },
    reportDate:
        {
            type: Date,
            default: Date.now
        },
    startShift:
        {
            type:Date
        },
    endShift:
        {
            type:Date
        },
    startBreak:
        {
            type:Date
        },
    startBreak:
        {
            type:Date
        }
});

module.exports = mongoose.model('AttendanceReport',attendanceReportSchema);

