const mongoose = require ('mongoose');
const schema= mongoose.Schema;
var d = new Date()
d.setTime( d.getTime() - new Date().getTimezoneOffset()*60*1000 );
const attendanceReportSchema = new schema({

 employmentID: {type: mongoose.Types.ObjectId, ref: 'Employment', required:false},

 contractorWorkerID: {type: mongoose.Types.ObjectId, ref: 'contractorWorker',required:false},

 reportDate: {type: Date, default: Date.now},

 startShift: {type:Date, default: Date.now},

 endShift: {type:Date, default: Date.now},

 startBreak: {type:Date, default: Date.now},


 endBreak: {type:Date, default: Date.now}

});

module.exports = mongoose.model('AttendanceReport',attendanceReportSchema);
