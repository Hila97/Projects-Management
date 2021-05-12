const mongoose = require ('mongoose');
const AttendanceReportCtrl=require('../models/AttendanceReport')


const addAttendanceReport=(req, res)=> {
    console.log("add")
    console.log(req.params.contractorWorkerID)
    const newAttendanceReport = new AttendanceReportCtrl({contractorWorkerID: req.cookies.contractorWorkerIDCookie.id})
    newAttendanceReport.save().then(report=>{
        res.render("attandenceReport", {report})
       // res.json({newAttendanceReport})
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
    var d = new Date()
    console.log(d)
    req.body.startBreak = d
    AttendanceReportCtrl.findOneAndUpdate({contractorWorkerID:req.cookies.contractorWorkerIDCookie.id}, {$set: {endShift: d}} ).then((result) => {
        res.send(result)
    })
}

var editEnteringTime=(req, res)=> {
    var d = new Date()
    console.log(d)
    req.body.startBreak = d
    AttendanceReportCtrl.findOneAndUpdate({contractorWorkerID:req.cookies.contractorWorkerIDCookie.id}, {$set: {endShift: d}} ).then((result) => {
        res.send(result)
    })
}

var editStartBreak=(req, res)=> {
    var d = new Date()
    console.log(d)
    req.body.startBreak = d
    AttendanceReportCtrl.findOneAndUpdate({contractorWorkerID:req.cookies.contractorWorkerIDCookie.id}, {$set: {startBreak: d}} ).then((result) => {
        res.send(result)
    })
    console.log("edit startbreak")
}

var editEndBreak=(req, res)=> {
    var d = new Date()
    console.log(d)
    req.body.startBreak = d
    AttendanceReportCtrl.findOneAndUpdate({contractorWorkerID:req.cookies.contractorWorkerIDCookie.id}, {$set: {endBreak: d}} ).then((result) => {
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

