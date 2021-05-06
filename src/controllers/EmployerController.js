const Employer=require('../models/Employer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Employment = require('../models/Employment')
const moment = require('moment')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#(&@!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

const addEmployer=(req, res)=>
{
    console.log("add")
    const newEmployer = new Employer(req.body)
    newEmployer.save().then(employer=>
    {
        console.log(req.body)
        res.json({newEmployer})
    }).catch(err =>
    {
        console.log(err)
    })
}

const findAllE=(req,res)=>
{
    console.log("find")
    Employer.find()
        .then((result)=>
        {
            res.send(result)
        })
        .catch((err)=>
        {
            console.log(err)
        })
}
const registerOfEmployer = async (req, res) =>
{
    var userName = req.body.userName
    var password = req.body.password
    var fullName = req.body.fullName
    var companyName = req.body.companyName
    var position = req.body.position
    var phone = req.body.phone
    var fieldOfEmployment = req.body.fieldOfEmployment

    var newEmployer= new Employer()
    newEmployer.userName=userName
    newEmployer.password=password
    newEmployer.fullName=fullName
    newEmployer.companyName= companyName
    newEmployer.position= position
    newEmployer.phone= phone
    newEmployer.fieldOfEmployment=fieldOfEmployment
    newEmployer.save(function (err,savedEmployer)
    {
        if (err)
        {
            console.log(err)
            return res.status(500).send()
        }
        return  res.json({status: 'ok', data: req.body})

    })
}
const loginOfEmployer= async (req, res) =>
{
    var userName = req.body.userName
    var password = req.body.password
    Employer.findOne({userName: userName, password: password}, function (err, employer)
    {
        if ((/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(userName)) == false)
        {
            return res.json({status: 'error', error: 'INVALID USERNAME'})
        }
        if ((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)) == false)
        {
            return res.json({status: 'error', error: 'INVALID PASSWORD'})
        }

        /*{
            return res.json({ status: 'error', error: 'NOT MATCH PASSWORD' })
        }
         */
        if (err)
        {
            console.log(err)
            return res.status(500).send()
        }
        if (!employer)
        {
            return res.json({status: 'error', error: 'USER NOT FOUND'})
        }

        return res.json({status: 'ok', data: req.body})
    })
}

const getBookedEmployeesToday= async (req, res)=> {
    const today = moment().utc(moment()).set('hour', 0).set('minute', 0).set('second', 0)
    const tomorrow = moment().utc(moment()).add(1, 'days').set('hour', 0).set('minute', 0).set('second', 0)
    // console.log(today)
    // console.log(tomorrow)
 
   
    try{
      const query = {$and : [
            {bookingDate : {$gte: today}},
            {bookingDate : {$lt: tomorrow}}
        ]}
        const employees = await Employment.find(query).populate('employerID').populate('workerID')
        if(employees.length===0){
            res.send('no employees booked that day')
            return
        }
       return  res.json(employees)
    }
    catch(e)
    {
        console.log(e)
    }  
}

const getBookedEmployeesFuture= async (req,res)=>
{
    const {id} = req.params
    try
    {  
        const employees = await Employment.find({ employerID : id,status : 'Future'}).populate('workerID')
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

module.exports={addEmployer,findAllE,registerOfEmployer,loginOfEmployer, getBookedEmployeesFuture, getBookedEmployeesToday}