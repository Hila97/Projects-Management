const mongoose = require ('mongoose');
const moment = require('moment')
const contractorWorker = require('../models/ContractorWorker')
const Vacation=require('../models/Vacation')
const attandenceReport = require('../models/AttendanceReport')
const express = require("express");
const validationResult = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const addContractor = async (req, res) =>
{
    console.log(req.body)
    const newContractor = new contractorWorker(req.body)
    await newContractor.save().then(contractor => {
        console.log("contractor added")
        res.render('HomeEmployee')
    }).catch(err => {
        console.log(err)
       // res.status(500).json({error:"error"})
    })
}
const findAllContractor =async (req, res)=>
{
    await contractorWorker.find({},
        {
            firstName:1,
            lastName:1,
            workingDays:1,
            fieldOfEmployment:1,
            areaOfResidence:1,
            hourlyWage:1,
            rating:1,
            Experience:1
        })
        .then(workerList=>
        {
            res.render("AllAvailableWorkers", {workerList})
        })
        .catch(err=>{
            console.log(err)
        })

}


async function findContractorByID(req, res)
{
    await contractorWorker.find({ID: req.body.ID}).then((result) =>{
        res.send(result)
    })
}

async function findContractorByAreaOfResidence(req, res) {
    await contractorWorker.find({areaOfResidence: req.body.areaOfResidence}).then((result) => {
        res.send(result)
    })
}


async function findContractorByFieldOfEmployment(req, res) {
    await contractorWorker.find({fieldOfEmployment: req.body.fieldOfEmployment}).then((result) =>
    {
        res.send(result)
    })
}

function findWorkerByRating(req,res){
    var query={rating:{$gte:req.params.rating}}
    contractorWorker.find(query).then((result)=>{
        res.send(result)
    })
}

function findWorkerByExperience(req,res){
    contractorWorker.find({experience:{$gte:req.params.experience}}).then((result)=>{
        res.send(result)
    })
}
////////////not good////////////
function findWorkerByHourlyWage(req,res,next){
    var query={hourlyWage:{$gte:req.params.min,$lte:req.params.max}}
    contractorWorker.find(query).then((result)=>{
        res.send(result)
    })
}
//////////////////////////////////
const displayEditProfile= async (req,res)=>
{
    await contractorWorker.findById({_id:req.cookies.contractorWorkerIDCookie.id})
        .then(contractor=> {
            console.log(contractor)
            res.render("ContractorWorkerViews/displayProfileContractor",{contractor})
        }).catch(err=>
        {
            return res.status(400).send('That contractor not found')
        })
}

const editProfile=(req, res)=>{
    if(!req.body)
        return res
            .status(400)
            .send({message:"error"})
    // const id = req.params.ID
    contractorWorker.findByIdAndUpdate(req.cookies.contractorWorkerIDCookie.id, req.body)
        .then(contractor=>{
            res.render('HomeContractor')
            if(!contractor) {
                res.status(404).send({message: 'error'})
            }else {
                res.send(contractor)
            }
        })
        .catch(err=>{
            console.log(err)
        })
}

async function findAvailableWorkers(req, res) {
    console.log("bbbbbbbbbbbbbbbbbbbbbb" ,req.cookies.employerIDCookie)
    // console.log("ccccccccccccccccccccccc" ,req.cookies.companyEmployeeIDCookie)
    var area,field
    var workDate,areaOfResidence, fieldOfEmployment, rating, min, max, experience;
    if(req.body.workDate!=null)
    {
        workDate = new Date(req.body.workDate)
        console.log("00000000000000000000000",workDate)
    }
    if (req.body.areaOfResidence=="ALL")
        area=0;
    else
        areaOfResidence = req.body.areaOfResidence;
    if (req.body.fieldOfEmployment=="ALL")
        field=0;
    else
        fieldOfEmployment = req.body.fieldOfEmployment;
    if (!req.body.rating)
        rating = 0;
    else
        rating = req.body.rating;
    if (!req.body.min)
        min = 0;
    else
        min = req.body.min;
    if (!req.body.max)
        max = 1000;
    else
        max = req.body.max;
    if (!req.body.experience)
        experience = 0;
    else
        experience = req.body.experience;
    // console.log(workDate,min, max, experience, areaOfResidence, fieldOfEmployment, rating);
    //console.log(area,field)
    if(field!=0 && area!=0)
    {
        var query1 = {

            areaOfResidence: areaOfResidence,
            fieldOfEmployment: fieldOfEmployment,
            rating: {$gte: rating},
            Experience: {$gte: experience},
            hourlyWage: {$gte: min, $lte: max}
        }
    }
    else
    {
        if( area!=0)
        {
            var query1 = {

                areaOfResidence: areaOfResidence,
                rating: {$gte: rating},
                Experience: {$gte: experience},
                hourlyWage: {$gte: min, $lte: max}
            }
        }
        else
        {
            if(field!=0)
            {
                var query1 = {
                    fieldOfEmployment: fieldOfEmployment,
                    rating: {$gte: rating},
                    Experience: {$gte: experience},
                    hourlyWage: {$gte: min, $lte: max}
                }
            }
            else
            {
                var query1 = {
                    rating: {$gte: rating},
                    Experience: {$gte: experience},
                    hourlyWage: {$gte: min, $lte: max}
                }
            }
        }
    }
    var query2={departureDate:{$lte:workDate},returningDate:{$gte: workDate}}
    const workerList=[]
    const workerIdList = await contractorWorker.find(query1,
        {
            firstName: 1,
            lastName: 1,
            telephone:1,
            email:1,
            fieldOfEmployment: 1,
            areaOfResidence: 1,
            hourlyWage: 1,
            rating: 1,
            Experience: 1
        }).catch(err=>{
        console.log(err)
    })
    console.log("filters:",workerIdList)
    const freeWorkers=await Vacation.find(query2,{_id:0,workerID:1})
        .catch(err=>{
            console.log(err)
        })
    console.log("date filters:",freeWorkers)
    for(var i=0;i<workerIdList.length;i++)
    {
        var flag=1
        for(var j=0;j<freeWorkers.length && flag; j++)
        {
            if(String(workerIdList[i]._id)===String(freeWorkers[j].workerID))
                flag=0
        }
        if(flag)
            workerList.push(workerIdList[i])
    }
    console.log("all filters:",workerList)

    res.render("EmployerViews/AllAvailableWorkers", {workerList,workDate})
}
const loginOfContractorWorker= async (req, res) =>
{
    var userName = req.body.userName
    var password = req.body.password
    console.log(userName,password)
    contractorWorker.findOne({userName: userName, password: password}, function (err, contractorW)
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
        console.log(contractorW)
        if (!contractorW)
        {
            // return res.json({status: 'error', error: 'USER NOT FOUND'})
            res.render('authViews/errorContractorWorkerNotExist')
        }
    }).then(result=>
    {
        let contractorWorkerIDCookie =
            {
                id: result._id
            }
        console.log(result._id)
        res.cookie("contractorWorkerIDCookie", contractorWorkerIDCookie)
        console.log(contractorWorkerIDCookie)
        // return res.json({status: 'ok', data: req.body})
        res.render('HomeContractor')
    })

}

const getRatingContractorWorkerByID= async (req,res)=>
{
    const {id} = req.params
    try
    {
        const contractorworker  = await contractorWorker.findOne({  _id : id })
        if(!contractorworker)
        {
            res.render('Error',{message : 'Employee not found'})
            return
        }

        res.render('getAllRatingsForWorker',{rating  : contractorworker.rating })
    }
    catch(e)
    {
        console.log(e)
    }
}
/*
// function getBusinessDatesCount(startDate, endDate) {
//     var count = 0;
//     var curDate = startDate;
//     while (curDate <= endDate) {
//         var dayOfWeek = curDate.getDay();
//         if(!((dayOfWeek == 6) || (dayOfWeek == 0)))
//            count++;
//         curDate.setDate(curDate.getDate() + 1);
//     }
//     return count;
const TotalhourWorkinMonth= async (req,res)=>
{
    const {id} = req.params
    try
    {
        const contractorworker  = await contractorWorker.findOne({  _id : id })
        if(!contractorworker)
        {
            res.render('Error',{message : 'Employee not found'})
            return
        }

    res.render('ratingPage',{rating  : contractorworker.rating })
    }
    catch(e)
    {
        console.log(e)
    }
}
*/


const findContractorWorkerById = async (req, res)=>
{
    var ID= req.body.ID
    contractorWorker.findOne({ID: ID}, function(err,worker)
    {
        if((/^\d{9}$/.test(ID)) == false)
        {
            return res.json({ status: 'error', error: 'INVALID ID' })
        }
        if(err)
        {
            console.log(err)
            return res.status(500).send()
        }
        if(!worker)
        {
            //return res.json({ status: 'error', error: 'WORKER NOT FOUND' })
            res.render('EmployeeViews/FailureToFindContractor')
        }
        else
            res.render('EmployeeViews/EmployeeSalaryAndReportOption',{ID})
        //return res.json({status: 'ok', data: req.body})
    })

    //      .then(result=>
    //  {
    //    res.render('EmployeeViews/EmployeeSalaryAndReportOption',{ID})
    //      console.log(result)
    //
    //  })
    // // console.log(contractor)
}



const findContractorWorkerByIdReturnAttendance = async (req, res)=>
{
    var ID= req.body.ID
    var C={
        contractorWorkerID:ID
    }
    contractorWorker.findOne({ID: ID}, function(err,worker)
    {
        if((/^\d{9}$/.test(ID)) == false)
        {
            return res.json({ status: 'error', error: 'INVALID ID' })
        }
        if(err)
        {
            console.log(err)
            return res.status(500).send()
        }
        if(!worker)
        {
            //return res.json({ status: 'error', error: 'WORKER NOT FOUND' })
            res.render('EmployeeViews/FailureToFindContractor')
        }
        else
        {
            console.log('vvvv')
        }
    }).then((r)=> {

        var workerID=r._id
        console.log("Hi")
        console.log(workerID)
        var q={
            contractorWorkerID:workerID
        }
        attandenceReport.find(q)
            .then((result)=>{
                console.log(result)
                res.render('EmployeeViews/attandenceReportByContractorID', {r:result})

            })
            .catch((err)=>{
                console.log(err)
            })
    })

}


const findContractorAttendance = async (req, res)=>
{
    var ID= req.params.contractorWorkerID
    console.log(ID)
    var C={
        contractorWorkerID:ID
    }
    contractorWorker.findOne({ID: ID}, function(err,worker)
    {
        if((/^\d{9}$/.test(ID)) == false)
        {
            return res.json({ status: 'error', error: 'INVALID ID' })
        }
        if(err)
        {
            console.log(err)
            return res.status(500).send()
        }
        if(!worker)
        {
            //return res.json({ status: 'error', error: 'WORKER NOT FOUND' })
            res.render('EmployeeViews/FailureToFindContractor')
        }
        else
        {
            console.log('vvvv')
        }
    }).then((r)=> {

        var workerID=r._id
        console.log("Hi")
        console.log(workerID)
        var q={
            contractorWorkerID:workerID
        }
        attandenceReport.find(q)
            .then((result)=>{
                console.log(result)
                res.render('EmployeeViews/attendanceReportOfContractor', {r:result})

            })
            .catch((err)=>{
                console.log(err)
            })
    })

}


const filterAttendanceByDate= async (req,res)=>
{
    console.log(req.params)
    var contractorWorkerID=req.params.contractorWorkerID
    console.log(contractorWorkerID)
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
                contractorWorkerID: contractorWorkerID,
                $and: [
                    {reportDate: {$gte: workDate}},
                    {reportDate: {$lt: tomorrow}}
                ]
            }
        attandenceReport.find(query).then((result)=>{
            console.log(result)
            res.render('EmployeeViews/attandenceReportByContractorID', {r:result})

        })
            .catch((err)=>{
                console.log(err)
            })
        // console.log(query)
        // console.log(r)
        // if (r.length === 0) {
        //     // res.render('Error',{message : 'No employees working that day'})
        //     res.send('no report working that day')
        //     return
        //
        // }
        // res.render('attandenceReportByContractorID', {r:r})
    }
    catch
        (e)
    {
        console.log(e)
    }
}


module.exports =
    {
        addContractor,
        findAllContractor,
        findContractorByID,
        editProfile,
        findWorkerByRating,
        findWorkerByHourlyWage,
        findWorkerByExperience,
        findContractorByAreaOfResidence,
        findContractorByFieldOfEmployment,
        loginOfContractorWorker,
        displayEditProfile,
        findAvailableWorkers,
        getRatingContractorWorkerByID,
        findContractorWorkerById,
        findContractorWorkerByIdReturnAttendance,
        findContractorAttendance,
        filterAttendanceByDate
        //TotalhourWorkinMonth,
        //TodaySalary
    }
