const mongoose = require ('mongoose');
const AttendanceReportCtrl=require('../models/AttendanceReport')


const addAttendanceReport=(req, res)=>
{
    console.log("add")
    console.log(req.params.contractorWorkerID)
    const newAttendanceReport = new AttendanceReportCtrl({contractorWorkerID: req.cookies.contractorWorkerIDCookie.id})
    newAttendanceReport.save().then(report=>{
        console.log(report)
        //res.send("report")
       res.render("HomeContractor", {report})
       //res.json({newAttendanceReport})
    }).catch(err => {
        console.log(err)
    })
    var d = new Date()
    d.setTime( d.getTime() - new Date().getTimezoneOffset()*60*1000 );
    console.log(d)
}
const findAllAttendanceReports=(req,res)=>
{
    console.log("find")
    AttendanceReportCtrl.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
}

const findAttendanceById=(req,res)=>
{
    AttendanceReportCtrl.find({contractorWorkerID: req.params.contractorWorkerID}).then((result) => {
        res.send(result)
    })
}


var editExistingTime=(req, res)=>
{
    var d = new Date()
    d.setTime( d.getTime() - new Date().getTimezoneOffset()*60*1000 );
    req.body.startBreak = d
    AttendanceReportCtrl.findOneAndUpdate({contractorWorkerID:req.cookies.contractorWorkerIDCookie.id}, {$set: {endShift: d}} ).then((result) => {
        res.send(result)
    })
    console.log(d)
}

var editEnteringTime=(req, res)=>
{
    var d = new Date()
    d.setTime( d.getTime() - new Date().getTimezoneOffset()*60*1000 );
    console.log(d)
    req.body.startBreak = d
    AttendanceReportCtrl.findOneAndUpdate({contractorWorkerID:req.cookies.contractorWorkerIDCookie.id}, {$set: {startShift: d}} ).then((result) => {
        res.send(result)
    })
}

var editStartBreak=(req, res)=>
{
    var d = new Date()
    d.setTime( d.getTime() - new Date().getTimezoneOffset()*60*1000 );
    console.log(d)
    req.body.startBreak = d
    AttendanceReportCtrl.findOneAndUpdate({contractorWorkerID:req.cookies.contractorWorkerIDCookie.id}, {$set: {startBreak: d}} ).then((result) => {
        res.send(result)
    })
    console.log("edit startbreak")
}

var editEndBreak=(req, res)=>
{
    var d = new Date()
    d.setTime( d.getTime() - new Date().getTimezoneOffset()*60*1000 );
    console.log(d)
    req.body.startBreak = d
    AttendanceReportCtrl.findOneAndUpdate({contractorWorkerID:req.cookies.contractorWorkerIDCookie.id}, {$set: {endBreak: d}} ).then((result) => {
        res.send(result)
    })
}
const calcTotalWork = (attendanceArr, hourlyWage) => {
    let totalWork = 0

    attendanceArr.forEach(a => {
       const start = a.startShift.getTime()
       const end = a.endShift.getTime()
       let total = end - start


       const startBreak = a.startBreak.getTime()
       const endBreak = a.endBreak.getTime()
       let totalBreak = endBreak - startBreak

       // sub break hours from work hours
       total -= totalBreak

       totalWork += total
    })

       let hours = Math.floor(totalWork / 1000 / 60 / 60)
       totalWork -= hours * 1000 * 60 * 60
       let minutes = Math.floor(totalWork / 1000 / 60)
       totalWork -= minutes * 1000 * 60
       let seconds = Math.floor(totalWork / 1000)

       const result =  (hours < 9 ? '0' : '') + hours + ':' + (minutes < 9 ? '0' : '') + minutes + ':' + (seconds < 9 ? '0' : '') + seconds

       let totalWage = (hours * hourlyWage) + (minutes * 0.16 * hourlyWage) + (seconds * 0.16 * 0.16 * hourlyWage)



   return  {totalHours: result, totalWage: totalWage}
}


const getWageByMonth= async (req, res)=> {

    // get all attendance by month and contractorID
    let {month, contractorWorkerID} = req.params
    const date = '2021-' + month + '-01'
    const nextMonthNum = '0' + (parseInt(month, 10) + 1).toString()
    const nextMonthString = '2021-' + nextMonthNum + '-01'
    console.log(nextMonthString)

    thisMonth = moment(new Date(date))
    nextMonth = moment(new Date(nextMonthString))


    thisMonth.utc(thisMonth).set('hour', 0).set('minute', 0).set('second', 0)
    nextMonth.utc(nextMonth).set('hour', 0).set('minute', 0).set('second', 0)
    console.log(thisMonth, nextMonth)

    try{
        const query = {
            $and : [
                {startShift : {$gte: thisMonth}},
                {startShift : {$lt: nextMonth}},
            ],
             contractorWorkerID: contractorWorkerID
        }

        const attendance = await AttendanceReport.find(query).populate('contractorWorkerID')
        if(attendance.length===0){
            res.send('no employees working that month')
            return
        }
         // for each attendance calc work hours
        const hourlyWage = attendance[0].contractorWorkerID.hourlyWage
        const result = calcTotalWork(attendance, hourlyWage)
        //return  res.json(result)
        return  res.render('TotalWageByMonth',{result: result})
    }
    catch(e)
    {
        console.log(e)
    }






}


module.exports={
    addAttendanceReport,
    findAllAttendanceReports,
    findAttendanceById,
    editExistingTime,
    editEnteringTime,
    editStartBreak,
    editEndBreak,
    calcTotalWork,
    getWageByMonth
}

