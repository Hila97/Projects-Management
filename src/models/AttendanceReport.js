const mongoose = require ('mongoose');
const schema= mongoose.Schema;
const attendanceReportSchema = new schema({

   employmentID: {type: mongoose.Types.ObjectId, ref: 'Employment', required:false},

    contractorWorkerID: {type: mongoose.Types.ObjectId, ref: 'ContractorWorker',required:false},

    //reportDate: {type: Date, default: Date.now,required:false},

    startShift: {type:Date},

    endShift: {type:Date},

    startBreak: {type:Date},

    endBreak: {type:Date}
});

module.exports = mongoose.model('AttendanceReport',attendanceReportSchema);

