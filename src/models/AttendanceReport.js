const mongoose = require ('mongoose');
const schema= mongoose.Schema;
const attendanceReportSchema = new schema({

   employmentID: {type: mongoose.Types.ObjectId, ref: 'Employment', required:false},

    contractorWorkerID: {type: mongoose.Types.ObjectId, ref: 'ContractorWorker',required:false},

   // reportDate: {type: Date, default: Date.now,required:false},

    startShift: {type:Date, default: Date.now()},

    endShift: {type:Date, default: Date.now()},

    startBreak: {type:Date, default: Date.now()},


    endBreak: {type:Date, default: Date.now()}

});

module.exports = mongoose.model('AttendanceReport',attendanceReportSchema);

