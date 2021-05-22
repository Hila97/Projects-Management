const Employment=require('../models/Employment')
const moment = require('moment')
const contractorWorker = require('../models/ContractorWorker')
const vacation=require('../models/Vacation')

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
    //let date=new Date(req.body.workDate,toString())
    // console.log(date)
    const s={
        workDate:workDate,
        employerID:req.cookies.employerIDCookie.id,
        workerID:req.body.workerID,
        field:req.body.fieldOfEmployment,
        jobDescription:req.body.jobDescription,
        startTime:workDate,
        endTime:workDate
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

/*
async function updateEmploymentToday(req,res,next)
{
    var date =new Date("2021-05-03")
    console.log(date, date.getDate)
    var date2=new Date().setDate(date.getDate()+1)
    var q={
        employerID: req.params.employerID,
        workDate:{$gte:date,$lt:date2}
    }
    Employment.updateMany(q,{$set: {status: 'Current'}}).then((result)=>{
        //res.send(result)
        console.log("updated successfully")
    }).catch(next)
}

 */
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


const findEmploymentById=(req,res)=>{
    Employment.findById()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
}

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
        getEmploymentsList


}