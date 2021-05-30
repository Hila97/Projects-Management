const mongoose = require ('mongoose');
const schema= mongoose.Schema;
var d = new Date()
d.setTime( d.getTime() - new Date().getTimezoneOffset()*60*1000 );
const attendanceReportSchema = new schema({

 employmentID: {type: mongoose.Types.ObjectId, ref: 'Employment', required:false},

 contractorWorkerID: {type: mongoose.Types.ObjectId, ref: 'contractorWorker',required:false},

 reportDate: {type: Date, default: d},

 startShift: {type:Date, default: d},

 endShift: {type:Date, default: d},

 startBreak: {type:Date, default: d},


 endBreak: {type:Date, default: d}

});

module.exports = mongoose.model('AttendanceReport',attendanceReportSchema);
