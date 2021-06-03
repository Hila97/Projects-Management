const Employment=require('../models/Employment')
const moment = require('moment')
const contractorWorker = require('../models/ContractorWorker')
const vacation=require('../models/Vacation')
const {reportDate} = require('../models/AttendanceReport')
const {confirmation}=require('../models/enums')
const {Status}=require('../models/enums')
const {FieldOfEmployment} = require('../models/enums')
async function BookForm(req, res) {
    // console.log(req.cookies.employerIDCookie.id)
    var workDate=new Date(req.params.workDate)
    console.log("the date that i got from the table to the form",workDate)
    console.log(req.params.workerID)
    const employer=req.cookies.employerIDCookie.id
    await contractorWorker.findById(req.params.workerID).then(worker => {
        console.log(worker)
        res.render('EmployerViews/BookEmployment',{ workDate:workDate,employer:employer,worker:worker})
    })
}

const addEmployment=async (req, res)=> {
    console.log("add")
    console.log(req.cookies.employerIDCookie.id)
    console.log(req.body)
    var workDate=new Date(req.params.workDate)
    console.log("the date i want to add",workDate)
    const dateStr = workDate.toISOString().split('T').shift();
    const startTimeAndDate = moment(dateStr + ' ' + req.body.startTime).toDate();
    startTimeAndDate.setHours(startTimeAndDate.getHours()+3)
    console.log("the date i want to start",startTimeAndDate)
    const endTimeAndDate = moment(dateStr + ' ' + req.body.endTime).toDate();
    endTimeAndDate.setHours(endTimeAndDate.getHours()+3)
    console.log("the date i want to start",endTimeAndDate)
    const s={
        workDate:workDate,
        employerID:req.cookies.employerIDCookie.id,
        workerID:req.body.workerID,
        field:req.body.fieldOfEmployment,
        jobDescription:req.body.jobDescription,
        startTime:startTimeAndDate,
        endTime:endTimeAndDate
    }
    const newEmployment = new Employment(s)
    await newEmployment.save().then(x=>
    {
        let d=new Date(workDate)
        d.setDate(workDate.getDate()+1)
        let v={
            workerID:req.body.workerID,
            departureDate:workDate,
            returningDate:d
        }
        const newVacation=new vacation(v)
        newVacation.save().then(va=>
        {
            console.log("the new vacation",va)
            console.log("the new employment",x)
            res.render('HomeEmployer')
        }).catch(err=>
        {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })

}

async function findTodayEmployment(req, res, next) {
    var query =
        {
            employerID: req.params.employerID,
            status: 'Current'
        }

    await Employment.find(query).then((result) => {
        res.send(result)
    }).catch(next)
}

const findAllEmployments=async (req,res)=>{
    console.log("find")
    Employment.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
}


// const UpdateStatus= async (req,res)=>{
//    const {workerID,status}= req.body
//     try{
//         const employeeStatus  = await Employment.findOneAndUpdate({status : {"$gte": next}}).populate('status')
//         if(next==="close"){
//          //   res.save(next)
//             res.send("you close")
//             return
//         }
//         if(next=="cancel"){
//             res.send("you cancel")
//             return
//         }
//
//        return  res.json(employeeStatus )
//     }catch(e){
//         console.log(e)
//     }
// }

async function findFutureEmployment(req, res, next) {
    console.log("the employer now is ",req.cookies.employerIDCookie.id)
    var query =
        {
            employerID: req.cookies.employerIDCookie.id,
            status: 'Future'
        }
    await Employment.find(query).populate('workerID').then((workerArr) => {
        console.log(workerArr)
        if(workerArr.length===0)
        {
            res.send("No workers found")
        }
        else
            res.render('FutureBooking',{workerArr})
    }).catch(e=>
    {
        console.log(e)
    })
}

async function updateEmploymentStatus(req, res, next) {
    await Employment.findByIdAndUpdate(req.params._id, {status: req.params.status}).then(employment => {
        console.log(req.body)
        res.json(req.body)
    }).catch(next)
}

const getAllEmployees= async (req,res)=>
{
    try
    {
        let employees = await Employment.find().populate('workerID')
        if(!employees.length)
        {
            res.render('Error',{message : 'No workers found'})
            return
        }
        employees.forEach(e => {
            // if(!e.workerID) return res.send('one of the worker ID doesnt exist')
            if(!e.workerID) res.render('Error',{message : 'one of the worker ID doesnt exist'})
        })

    //    return  res.json(employees)
    res.render('employmentsList',{employments : employees})
    }
    catch(e)
    {
        console.log(e)
    }
}


const filterEmployeesByStatus = async (req,res)=>
{


    const {status} = req.params
    try{
        const employees = await Employment.find({  status : status }).populate('workerID')
        if(employees.length===0)
        {
            res.send('No workers found')
            return
        }
        employees.forEach(e => {
            if(!e.workerID) res.render('Error', {message : 'this worker ID doesnt exist'})
            return
        })

        const resData = employees.map(e=>e.workerID)
        res.render('filterEmployeesByStatus',{employees : resData})

    }
    catch(e)
    {
        console.log(e)
    }
}
const filterEmploymentsByBookingDate= async (req,res)=>
{
    let {BookingDate} = req.params
    BookingDate = new moment(BookingDate)
    BookingDate.utc(BookingDate).set('hour', 0).set('minute', 0).set('second', 0)
    const tomorrow = new moment(BookingDate)
    tomorrow.utc(tomorrow).add(1, 'days').set('hour', 0).set('minute', 0).set('second', 0)
    console.log(BookingDate, tomorrow)

    try{
        const query = {$and : [
                {bookingDate : {$gte: BookingDate}},
                {bookingDate : {$lt: tomorrow}}
            ]}
        const employees = await Employment.find(query).populate('workerID')
        if(employees.length===0){
           // res.render('Error',{message : 'No employees working that day'})
            res.send('no employees working that day')
            return

        }
        const employeesArr = []
        employees.forEach(e => {
            // if(!e.workerID) return res.send('this worker ID doesnt exist')
            if(!e.workerID){
                res.render('Error',{message : 'this worker ID doesnt exist'})
                return
            }
            employeesArr.push(e.workerID)
        })

        // return  res.json(employees)
        res.render('filterEmploymentsByBookingDate',{employees : employeesArr})
    }
    catch(e)
    {
        console.log(e)
    }
}

const filterEmploymentsByDateContractor= async (req,res)=>
{
    var workerID=req.cookies.contractorWorkerIDCookie.id
    console.log(workerID)
    let {workDate}= req.params
    console.log(workDate)
    workDate = new moment(workDate)
    workDate.utc(workDate).set('hour', 0).set('minute', 0).set('second', 0)
    const tomorrow = new moment(workDate)
    tomorrow.utc(tomorrow).add(1, 'days').set('hour', 0).set('minute', 0).set('second', 0)
    console.log(workDate, tomorrow)
    // today1.set({hour:0,minute:0,second:0,millisecond:0})
    try {
        var query =
            {
                workerID: workerID,
                $and: [
                    {workDate: {$gte: workDate}},
                    {workDate: {$lt: tomorrow}}
                ]
            }
        const employments = await Employment.find(query).populate('workerID')
        console.log(query)
        if (employments.length === 0) {
            // res.render('Error',{message : 'No employees working that day'})
            res.send('no employees working that day')
            return

        }
        res.render('ContractorWorkerViews/historyContractor', {employments: employments})
    }
    catch
        (e)
    {
        console.log(e)
    }
}


const filterEmploymentsByBookingMonth= async (req,res)=>
{
    let {month} = req.params
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
        const query = {$and : [
                {bookingDate : {$gte: thisMonth}},
                {bookingDate : {$lt: nextMonth}}
            ]}
            const employees = await Employment.find(query).populate('workerID')
            if(employees.length===0){
                res.render('Error',{message : 'No employees working that month'})
                return
                //res.send('no employees working that day')
                //return
            }
            const employeesArr = []
            employees.forEach(e => {
                // if(!e.workerID) return res.send('this worker ID doesnt exist')
                if(!e.workerID){
                    res.render('Error',{message : 'this worker ID doesnt exist'})
                    return
                }
                employeesArr.push(e.workerID)
            })

        res.render('filterEmploymentsByBookingMonth',{employees : employeesArr})
        //return  res.json(employees)
    }
    catch(e)
    {
        console.log(e)
    }
}

const getEmploymentsList = async (req,res)=>{
    Employment.find()
        .then((result)=>{
            res.render('employmentsList', {employments: result})
        })
        .catch((err)=>{
            console.log(err)
        })
}

const getEmploymentsListForContractor = async (req,res)=>{
    var workerID=req.cookies.contractorWorkerIDCookie.id
    console.log(workerID)
    var q={
        workerID:workerID
    }
    Employment.find(q)
        .then((result)=>{
            res.render('attandenceReport', {employments: result})
        })
        .catch((err)=>{
            console.log(err)
        })
}

async function findPastEmploymentsForContractor(req, res, next) {
    var workerID=req.cookies.contractorWorkerIDCookie.id
    var today1= moment()
    today1.set({hour:0,minute:0,second:0,millisecond:0})
    var query =
        {
            workerID:workerID,
            workDate : {$lt: today1}
        }
    await Employment.find(query).sort({workDate:-1}).then((employments) => {
        if(employments.length===0)
        {
            res.send("No past employment found")
        }
        else
            res.render('ContractorWorkerViews/historyContractor',{employments})
    }).catch(e=>
    {
        console.log(e)
    })
}

async function findPastEmployments(req, res, next) {
    console.log("the employer now is ",req.cookies.employerIDCookie.id)
    var today1= moment()
    today1.set({hour:0,minute:0,second:0,millisecond:0})
    var query =
        {
            employerID: req.cookies.employerIDCookie.id,
            workDate : {$lt: today1},
            confirmation:confirmation.APPROVED
        }
    await Employment.find(query).populate('workerID').sort({workDate:-1}).then((employments) => {
        if(employments.length===0)
        {
            res.send("No employments found")
        }
        else
            res.render('EmployerViews/HistoryOfEmployments',{employments})
    }).catch(e=>
    {
        console.log(e)
    })
}
async function calculateRatingOfWorker(employmentID)
{
    console.log("got here",employmentID)
    await Employment.findById(employmentID,{_id:0,workerID:1}).then(z=>
    {
        console.log(z)
        var w_id=z.workerID
        Employment.aggregate(
            [
                {
                    $match:
                        {
                            workerID: w_id,
                            rank:{$ne:0}
                        }
                },
                {
                    $group:
                        {
                            _id: "$workerID",
                            AverageValue: { $avg: "$rank" }
                        }
                }
            ]
        ).then(avg=>
        {
            console.log("the avg is",avg)
            var newRank=avg[0].AverageValue
            console.log(newRank,avg[0]._id)
            contractorWorker.findByIdAndUpdate(avg[0]._id,{$set:{rating:newRank}}).then(x=>{
                console.log(x)
            })
        })
    })
}
async function rateEmployment(req,res)
{
    const employmentID=req.body.employmentID
    var stars=req.body.rate;
    await Employment.findByIdAndUpdate(employmentID,{$set:{rank:stars}}).then(x=>{
        calculateRatingOfWorker(employmentID);
        res.redirect('/employment/history')
    })
}
async function findEmploymentsForConfirmation(req,res)
{
    console.log("i got here")
    var workerID=req.cookies.contractorWorkerIDCookie.id
   // console.log(workerID)
    var q={
        workerID:workerID,
        confirmation:confirmation.PENDING,
        status:Status.FUTURE
    }
   await Employment.find(q).populate('employerID').then(employments=>{
       res.render('ContractorWorkerViews/employmentsToApprove',{employments})
   })
}
async function confirmEmployment(req,res)
{
    var workerID=req.cookies.contractorWorkerIDCookie.id
    console.log(workerID)
    console.log(req.params.ID)
    await Employment.findByIdAndUpdate(req.params.ID,{$set:{confirmation:confirmation.APPROVED}})
    res.render('HomeContractor')
}
async function rejectEmployment(req,res)
{
    var workerID=req.cookies.contractorWorkerIDCookie.id
    console.log(workerID)
    console.log(req.params.ID)
    var date=new Date(req.params.workDate)
    console.log(date)
    var q={
        workerID:workerID,
        departureDate:date
    }
    await Employment.findByIdAndUpdate(req.params.ID,{$set:{confirmation:confirmation.CANCELED}})
    await vacation.findOneAndDelete(q).then(z=>{
        console.log("deleted ")
    })
    res.render('HomeContractor')
}

async function filterHistoryByfieldOfEmployment(req, res)
{
    console.log("filter field of employment")
    var workerID=req.cookies.contractorWorkerIDCookie.id
    let {FieldOfEmployment} = req.params
    var query = {
        workerID : workerID,
        field : {$eq: FieldOfEmployment}
    }
    await Employment.find(query).then(employments).then((employments) => {
        if(employments.length===0)
        {
            res.send("No employments found")
        }
        else
            res.render('historyContractor',{employments})
    }).catch(e=>
    {
        console.log(e)
    })
}
const getAllRatingsForWorker = async (req,res)=>{
    try {
        const {workerID} = req.params
        console.log(workerID)
        const employersRatings = await Employment.find({workerID: workerID}).populate('employerID').select('-_id employerID rank')
        console.log(employersRatings)
        if(employersRatings.length === 0){
            return res.render('Error', {message: 'No employments found'})
        }
        return res.render('employersRatings', {ratings: employersRatings})
    } catch (e) {
        console.log(e)
    }
}
async function findEmploymentByID(req,res)
{
    console.log(req.params.employmentID)
    var id=req.params.employmentID
    var q={
        _id:id
    }
    await Employment.findById(q).populate('workerID').then(e=>{
        console.log(e)
        res.render('EmployerViews/EmploymentDetails',{e})
    })
}
module.exports={
    addEmployment,
    findAllEmployments,
    findFutureEmployment,
    findTodayEmployment,
    filterEmployeesByStatus,
    filterEmploymentsByBookingDate,
    filterEmploymentsByBookingMonth,
    BookForm,
    getAllEmployees,
    getEmploymentsList,
    getEmploymentsListForContractor,
    findPastEmployments,
    rateEmployment,
    findEmploymentsForConfirmation,
    findPastEmploymentsForContractor,
    confirmEmployment,
    rejectEmployment,
    filterEmploymentsByDateContractor,
    filterHistoryByfieldOfEmployment,
 getAllRatingsForWorker,
    findEmploymentByID

}
