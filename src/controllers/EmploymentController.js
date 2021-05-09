const Employment=require('../models/Employment')
const moment = require('moment')

const addEmployment=(req, res)=> {
    console.log("add")
    const newEmployment = new Employment(req.body)
    newEmployment.save().then(employment=>{
        console.log(req.body)
        res.json({newEmployment})
    }).catch(err => {
        console.log(err)
    })
}
const findAllEmployments=(req,res)=>{
    console.log("find")
    Employment.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
}


const Updatestatus= async (req,res)=>{
   const {workerID,status}= req.body
    try{
        const employesatus = await Employment.findOneAndUpdate({status : {"$gte": next}}).populate('status')
        if(next=="close"){
         //   res.save(next)
            res.send("you close")
            return
        }
        if(next=="cancel"){
            res.send("you cancel")
            return
        }
       
       return  res.json(employestatus)
    }catch(e){
        console.log(e)
    }  
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
function findFutureEmployment(req,res,next)
{
    var query=
        {
            employerID: req.params.employerID,
            status: 'Future'
        }
    Employment.find(query).then((result)=>{
    res.send(result)
}).catch(next)
}
///not good, should find a good query
function updateEmploymentToday(req,res,next)
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
function findTodayEmployment(req,res,next)
{
    var query=
        {
            employerID: req.params.employerID,
            status: 'Current'
        }

    Employment.find(query).then((result)=>{
        res.send(result)
    }).catch(next)
}
function updateEmploymentStatus(req,res,next)
{
    Employment.findByIdAndUpdate(req.params._id,{status:req.params.status}).then(employment=>{
    console.log(req.body)
    res.json(req.body)
}).catch(next)
}


const getEmployeesByEmployerID= async (req,res)=>
{
    const {id} = req.params
    try
    {
        const employees = await Employment.find({ employerID : id})
        if(employees.length===0)
        {
            res.send("No workers found")
            return
        }

       return  res.json(employees)
    }
    catch(e)
    {
        console.log(e)
    }
}

const getEmployeesByEmployerIDAndStatus= async (req,res)=>
{
    const {id, status} = req.params
    try
    {
        const employees = await Employment.find({ employerID : id, status : status })
        if(employees.length===0)
        {
            res.send("No workers found")
            return
        }

       return  res.json(employees)
    }
    catch(e)
    {
        console.log(e)
    }
}

const getEmployeesByStatus= async (req,res)=>
{
    const {status} = req.params
    try
    {
        const employees = await Employment.find({  status : status }).populate('workerID')
        if(employees.length===0)
        {
            res.send("No workers found")
            return
        }

       return  res.json(employees)
    }
    catch(e)
    {
        console.log(e)
    }
}


const getEmploymentsByWorkDate= async (req,res)=>
{
    let {WorkDate} = req.params
    WorkDate = new moment(WorkDate)
    WorkDate.utc(WorkDate).set('hour', 0).set('minute', 0).set('second', 0)
    const tomorrow = new moment(WorkDate)
    tomorrow.utc(tomorrow).add(1, 'days').set('hour', 0).set('minute', 0).set('second', 0)


    try{
      const query = {$and : [
            {workDate : {$gte: WorkDate}},
            {workDate : {$lt: tomorrow}}
        ]}
        const employees = await Employment.find(query)
        if(employees.length===0){
            res.send('no employees working that day')
            return
        }
       return  res.json(employees)
    }
    catch(e)
    {
        console.log(e)
    }
}

const getEmploymentsByBookingDate= async (req,res)=>
{
    let {BookingDate} = req.params
    BookingDate = new moment(BookingDate)
    BookingDate.utc(BookingDate).set('hour', 0).set('minute', 0).set('second', 0)
    const tomorrow = new moment(BookingDate)
    tomorrow.utc(tomorrow).add(1, 'days').set('hour', 0).set('minute', 0).set('second', 0)
    console.log(BookingDate, tomorrow)

    try{
      const query = {$and : [
            {BookingDate : {$gte: BookingDate}},
            {BookingDate : {$lt: tomorrow}}
        ]}
        const employees = await Employment.find(query)
        if(employees.length===0){
            res.send('no employees working that day')
            return
        }
       return  res.json(employees)
    }
    catch(e)
    {
        console.log(e)
    }
}

const getEmploymentsByBookingDateMonth= async (req,res)=>
{
    let {month} = req.params
    const date = '2021-' + month + '-01'
    const nextMonthNum = parseInt(month, 10) + 1
    const nextMonthNumString = new Date('2021-' + nextMonthNum.toString() + '-01')
    console.log(nextMonthNumString)

    thisMonth = new moment(date)
    nextMonth = new moment(nextMonthNumString)

    thisMonth.utc(thisMonth).set('hour', 0).set('minute', 0).set('second', 0)
    nextMonth.utc(nextMonth).set('hour', 0).set('minute', 0).set('second', 0)
    console.log(thisMonth, nextMonth)

    try{
      const query = {$and : [
            {BookingDate : {$gte: thisMonth}},
            {BookingDate : {$lt: nextMonth}}
        ]}
        const employees = await Employment.find(query)
        if(employees.length===0){
            res.send('no employees working that day')
            return
        }
       return  res.json(employees)
    }
    catch(e)
    {
        console.log(e)
    }
}

module.exports={addEmployment,findAllEmployments,findFutureEmployment,findTodayEmployment,updateEmploymentStatus,updateEmploymentToday,  getEmployeesByEmployerID,
    getEmployeesByEmployerIDAndStatus,
    getEmploymentsByWorkDate, getEmployeesByStatus, getEmploymentsByBookingDate, getEmploymentsByBookingDateMonth}
module.exports=
    {
        addEmployment,
        findAllEmployments,
        findFutureEmployment,
        findTodayEmployment,
        updateEmploymentStatus,
        getEmployeesByEmployerID,
        getEmployeesByEmployerIDAndStatus,
        getEmploymentsByWorkDate,
        getEmployeesByStatus,
        getEmploymentsByBookingDate,
        getEmploymentsByBookingDateMonth
    }

