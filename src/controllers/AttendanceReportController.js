const mongoose = require ('mongoose');
const AttendanceReportCtrl=require('../models/AttendanceReport')
const emoloyment=require('../controllers/EmploymentController')
const ErrorReport=require('../models/ErrorReport')
const emoloyments=require('../models/Employment')
const moment = require('moment')


async function addAttendanceReport(req, res)
{
    console.log("add")
    console.log(req.params)
    const newAttendanceReport = new AttendanceReportCtrl({contractorWorkerID: req.cookies.contractorWorkerIDCookie.id})
    await newAttendanceReport.save()
         .then(report=>{
             emoloyments.findOneAndUpdate({_id:req.params._id}, {temp:1}).then(result=>{
                 res.render("HomeContractor", {report})
             })
         })
    .catch(err => {
        console.log(err)
    })

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
        res.render("HomeContractor")
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
        res.render("HomeContractor")
    })
}

var editStartBreak=(req, res)=>
{
    var d = new Date()
    d.setTime( d.getTime() - new Date().getTimezoneOffset()*60*1000 );
    console.log(d)
    req.body.startBreak = d
    AttendanceReportCtrl.findOneAndUpdate({contractorWorkerID:req.cookies.contractorWorkerIDCookie.id}, {$set: {startBreak: d}} ).then((result) => {
        res.render("HomeContractor")
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
        res.render("HomeContractor")
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



    return  {totalHours: result, totalWage: totalWage.toFixed(2)}

}

const getWageByYearMonthDayFunc = async (val, workerID, action) => {

    let date, topDateTmp, topDateString, tmp
    switch (action) {
        case 'year':
            date = val + '-01' + '-01'
            tmp = parseInt(val, 10) + 1
            topDateTmp =  tmp < 10 ? '0' + (tmp).toString() : (tmp).toString()
            topDateString = topDateTmp + '-01' + '-01'
            console.log(topDateString)
            break

        case 'month':
            date = '2021-' + val + '-01'
            tmp = parseInt(val, 10) + 1
            topDateTmp =  tmp < 10 ? '0' + (tmp).toString() : (tmp).toString()
            topDateString = '2021-' + topDateTmp + '-01'
            console.log(topDateString)
            break

        case 'day':
            const thisMonth = parseInt(moment().format('M'), 10).toString()
            date = '2021-' + thisMonth + '-' + val
            tmp = ((parseInt(val, 10) + 1) % 31)
            tmp = tmp === 0 ? 1 : tmp
            topDateTmp =  tmp < 10 ? '0' + (tmp).toString() : (tmp).toString()
            topDateString = '2021-' + thisMonth + '-' + topDateTmp
            console.log(topDateString)
            break

        default:
            break
    }

    startDate = moment(new Date(date))
    topDate = moment(new Date(topDateString))


    startDate.utc(startDate).set('hour', 0).set('minute', 0).set('second', 0)
    topDate.utc(topDate).set('hour', 0).set('minute', 0).set('second', 0)
    console.log(startDate, topDate)


    try{
        const query = {
            $and : [
                {startShift : {$gte: startDate}},
                {startShift : {$lt: topDate}},
            ],
            contractorWorkerID: workerID
        }

        const attendance = await AttendanceReportCtrl.find(query).populate('contractorWorkerID')
        if(attendance.length===0){
            return {message:'You didnt work that date'}

        }
        // for each attendance calc work hours
        const hourlyWage = attendance[0].contractorWorkerID.hourlyWage
        const result = calcTotalWork(attendance, hourlyWage)
        //return  res.json(result)
        return result
    }
    catch(e)
    {
        console.log(e)
    }
}


const getWageByMonth= async (req, res)=> {

    // get all attendance by month and contractorID
    let {month, contractorWorkerID} = req.params
    const result = await getWageByYearMonthDayFunc(month, contractorWorkerID, 'month')
    if(result.message){
        res.render('Error',{message: result.message})
        return
    }

    return  res.render('totalWageByMonth',{salary: result})

}


const getThisMonthSalary= async (req, res)=> {

    let {contractorWorkerID} = req.params

    // get the month of today date
    let month = parseInt(moment().format('M'), 10)

    // function to get the total wage for a month and total hours worked, parameters date value, workerID, get wage by year,month,day
    const result = await getWageByYearMonthDayFunc(month, contractorWorkerID, 'month')

    // check if there is an error
    if(result.message){
        res.render('thisMonthSalary',{message: result.message})
        return
    }

    return  res.render('thisMonthSalary',{salary: result})

}
const getTwoMonthsSalaries= async (req, res)=> {

    let {contractorWorkerID, month1, month2} = req.params

    const result = []
    // function to get the total wage for a month and total hours worked
    // for month1 and month2
    const result1 = await getWageByYearMonthDayFunc(month1, contractorWorkerID, 'month')
    const result2 = await getWageByYearMonthDayFunc(month2, contractorWorkerID, 'month')

    // add two results to the array
    result.push(result1)
    result.push(result2)

    // check if there is an error
    if(result1.message){
        res.render('ContractorWorkerViews/compareTwoMonthSalaries', {message:'You didnt work on month : ' + month1 })
        return
    }
    else if(result2.message){
        res.render('ContractorWorkerViews/compareTwoMonthSalaries', {message:'You didnt work on month : ' + month2 })
        return
    }

    return  res.render('ContractorWorkerViews/compareTwoMonthSalaries',{salary1: result[0], salary2: result[1]})

}

const getTodaySalary= async (req, res)=> {

    let {contractorWorkerID} = req.params

    let today = parseInt(moment().format('D'), 10)

    const result = await getWageByYearMonthDayFunc(today, contractorWorkerID, 'day')

    // check if there is an error
    if(result.message){
        res.render('todaySalaryContractorWorker', {message:'You didnt work today' })
        return
    }


    return  res.render('todaySalaryContractorWorker',{salary: result})

}

const getThisYearSalary= async (req, res)=> {

    let {contractorWorkerID} = req.params

    let year = parseInt(moment().format('Y'), 10)

    const result = await getWageByYearMonthDayFunc(year, contractorWorkerID, 'year')

    // check if there is an error
    if(result.message){
        res.render('thisYearProfit', {message : 'You didnt work this year ' })
        return
    }


    return  res.render('thisYearProfit',{salary : result})

}


const calcWorkRangeByShift = (attendanceArr, hourlyWage) => {
    let  totalSalaryArr = []
    console.log(attendanceArr, hourlyWage)
    attendanceArr.forEach(a => {
        const start = a.startShift.getTime()
        const end = a.endShift.getTime()
        let total = end - start


        const startBreak = a.startBreak.getTime()
        const endBreak = a.endBreak.getTime()
        let totalBreak = endBreak - startBreak

        // sub break hours from work hours
        total -= totalBreak

        let hours = Math.floor(total / 1000 / 60 / 60)
        total -= hours * 1000 * 60 * 60
        let minutes = Math.floor(total / 1000 / 60)
        total -= minutes * 1000 * 60
        let seconds = Math.floor(total / 1000)


        let totalWage = (hours * hourlyWage) + (minutes * 0.16 * hourlyWage) + (seconds * 0.16 * 0.16 * hourlyWage)
        totalWage = totalWage.toFixed(2)


        totalSalaryArr.push(totalWage)
    })

    let from = Math.min(...totalSalaryArr)
    let to = Math.max(...totalSalaryArr)

    console.log(totalSalaryArr)

    return  {from: from, to: to}
}

const getRangeOfSalaryByShift= async (req, res)=> {

    let {contractorWorkerID} = req.params

    try {
        const attendance = await AttendanceReportCtrl.find({contractorWorkerID : contractorWorkerID}).populate('contractorWorkerID')
        if(attendance.length === 0){
            return res.render('Error', {message: 'You didnt worked yet'})
        }
        const result = calcWorkRangeByShift(attendance, attendance[0].contractorWorkerID.hourlyWage)
        console.log(result)

        return  res.render('rangeOfSalaryByShifts',{range : result})
    } catch (e) {
        console.log(e)
    }



}


const displayEditAttendance= async (req,res)=>
{
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    var ID= req.params._id
    console.log(ID)
    await AttendanceReportCtrl.findById({_id:ID})
        .then(attendance=> {
            console.log(attendance)
            res.render("EmployeeViews/addErrorReport",{attendance})
        }).catch(err=>
        {
            return res.status(400).send('That attendance not found')
        })
}


const  editAttendanceReport=(req, res)=>{
    var ID=req.params.ID
    AttendanceReportCtrl.findById(ID).then(result=>{
        console.log(result)
        var startS=result.startShift
        var endS=result.endShift
        var startB=result.startBreak
        var endB=result.endBreak

        const S1 = startS.toISOString().split('T').shift();
        const enterS= moment(S1 + ' ' + req.body.startShift).toDate();
        enterS.setHours(enterS.getHours()+3)
        console.log(enterS)

        const S2 = endS.toISOString().split('T').shift();
        const exitS = moment(S2 + ' ' + req.body.endShift).toDate();
        exitS.setHours(exitS.getHours()+3)
        console.log(exitS)

        const B1 = startB.toISOString().split('T').shift();
        const enterB = moment(B1+ ' ' + req.body.startBreak).toDate();
        enterB.setHours(enterB.getHours()+3)
        console.log(enterB)

        const B2 = endB.toISOString().split('T').shift();
        const exitB = moment(B2 + ' ' + req.body.endBreak).toDate();
        exitB.setHours(exitB.getHours()+3)
        console.log(exitB)

        AttendanceReportCtrl.findByIdAndUpdate(ID, {startShift:enterS,endShift:exitS,startBreak:enterB,endBreak:exitB})
            .then(att=>{
                ErrorReport.findOneAndUpdate({attendanceReportID:req.params.ID},{status:1}).then(result=>{
                res.render('HomeEmployee')
                if(!result) {
                    res.status(404).send({message: 'error'})
                }else {
                    res.send(result)
                }
                })
            })
            .catch(err=>{
                console.log(err)
            })
    })

    // A.startShift.setTime(req.body.startShift)

    if(!req.body)
        return res
            .status(400)
            .send({message:"error"})
    // const id = req.params.ID

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
    getWageByMonth,
    getThisMonthSalary,
    getTwoMonthsSalaries,
    getTodaySalary,
    getThisYearSalary,
    getRangeOfSalaryByShift,
    displayEditAttendance,
    calcWorkRangeByShift,
    editAttendanceReport
}

