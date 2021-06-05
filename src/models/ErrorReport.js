const mongoose = require ('mongoose');
const schema= mongoose.Schema;
const errorReportSchema = new schema({
    attendanceReportID:
        {
            type: mongoose.Types.ObjectId,
            ref: 'AttendanceReport'
        },
    companyEmployeeID:
        {
            type: mongoose.Types.ObjectId,
            ref: 'CompanyEmployee'
        },
    reportDate:
        {
            type: Date,
            default: Date.now
        },
    errorDescription:
        {
            type:String
        },
        status:{ type:Number, default:0}
});

module.exports = mongoose.model('ErrorReport',errorReportSchema);

