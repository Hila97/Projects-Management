const mongoose = require ('mongoose');
const AttendanceReportCtrl=require('../models/AttendanceReport')


const addAttendanceReport=(req, res)=> {
    console.log("add")
    const newAttendanceReport = new AttendanceReportCtrl(req.body)
    newAttendanceReport.save().then(report=>{
        console.log(req.body)
        res.json({newAttendanceReport})
    }).catch(err => {
        console.log(err)
    })
}
const findAllAttendanceReports=(req,res)=>{
    console.log("find")
    AttendanceReportCtrl.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
}

const findAttendanceById=(req,res)=>{
    AttendanceReportCtrl.find({contractorWorkerID: req.params.contractorWorkerID}).then((result) => {
        res.send(result)
    })
}


var editExistingTime=(req, res)=> {
    AttendanceReportCtrl.findOneAndUpdate({contractorWorkerID: req.params.contractorWorkerID}, req.params.endShift ).then((result) => {
        res.send(result)
    })
}

var editEnteringTime=(req, res)=> {
    AttendanceReportCtrl.findOneAndUpdate({contractorWorkerID: req.params.contractorWorkerID}, req.params.startShift ).then((result) => {
        res.send(result)
    })
}

var editStartBreak=(req, res)=> {
    AttendanceReportCtrl.findOneAndUpdate({contractorWorkerID: req.params.contractorWorkerID}, req.params.startBreak ).then((result) => {
        res.send(result)
    })
}

var editEndBreak=(req, res)=> {
    AttendanceReportCtrl.findOneAndUpdate({contractorWorkerID: req.params.contractorWorkerID}, req.params.endBreak ).then((result) => {
        res.send(result)
    })
}


module.exports={
    addAttendanceReport,
    findAllAttendanceReports,
    findAttendanceById,
    editExistingTime,
    editEnteringTime,
    editStartBreak,
    editEndBreak
}

