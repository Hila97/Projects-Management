const ErrorReport=require('../models/ErrorReport')
const attandenceReport = require('../models/AttendanceReport')

const addErrorReport=(req, res)=> {
    console.log("add")
    const attendanceReportID=req.params.attendanceReportID
    const newErrorReport = new ErrorReport({attendanceReportID:attendanceReportID, companyEmployeeID:req.cookies.companyEmployeeIDCookie.id, reportDate:req.params.reportDate, errorDescription:req.body.errorDescription})
    newErrorReport.save().then(errorReport=>{
        console.log(req.body)
        res.render("HomeEmployee")
    }).catch(err => {
        console.log(err)
    })
}
const findAllErrorReports=(req,res)=>{
    console.log("find1")
    ErrorReport.find()
        .then((result)=>{
            res.render('fixErrorReports',{errorReports:result})
        })
        .catch((err)=>{
            console.log(err)
        })
}


const displayErrorReport = (req,res)=>{
    ID= req.params._id
    console.log("find2")
    attandenceReport.findById(ID)
        .then((result)=>{
            res.render('addErrorReport', {result})
        })
        .catch((err)=>{
            console.log(err)
        })
}
/*
const findEmploymentById=(req,res)=>{
    Employment.findById()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
}

 */



const showErrorReport = (req,res)=>{
    ID= req.params.attendanceReportID
    console.log("===========================================")
    console.log(ID)
    attandenceReport.findById(ID)
        .then((result)=>{
            res.render('editAttendanceReport', {attandence:result})
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports={
    addErrorReport,
    findAllErrorReports,
    displayErrorReport,
    showErrorReport
}

