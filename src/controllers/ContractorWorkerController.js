const mongoose = require ('mongoose');
const contractorWorker = require('../models/ContractorWorker')
const Vacation=require('../models/Vacation')
const express = require("express");
const validationResult = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const addContractor = async (req, res) => {
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
const findAllContractor =async (req, res)=>{
    await contractorWorker.find({},{firstName:1,
        lastName:1,
        workingDays:1,
        fieldOfEmployment:1,
        areaOfResidence:1,
        hourlyWage:1,
        rating:1,
        Experience:1
    })
        .then(workerList=> {
            res.render("AllAvailableWorkers", {workerList})
        })
        .catch(err=>{
            console.log(err)
        })

}


async function findContractorByID(req, res) {
    await contractorWorker.find({ID: req.body.ID}).then((result) => {
        res.send(result)
    })
}

async function findContractorByAreaOfResidence(req, res) {
    await contractorWorker.find({areaOfResidence: req.body.areaOfResidence}).then((result) => {
        res.send(result)
    })
}


async function findContractorByFieldOfEmployment(req, res) {
    await contractorWorker.find({fieldOfEmployment: req.body.fieldOfEmployment}).then((result) => {
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
    let contractor=await contractorWorker.findOne({ID:req.params.ID})
    if(contractor){
        res.render('../views/displayProfileContractor',contractor)
    }
    else{
        return res.status(400).send('That contractor ID not valid')
    }
}
const editProfile=(req, res)=>{
    if(!req.body)
        return res
            .status(400)
            .send({message:"error"})
    const  id = req.params.ID
    contractorWorker.findOneAndUpdate(id, req.body)
        .then(contractor=>{
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
    const workerIdList = await contractorWorker.find(query1, {
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
            return res.json({status: 'error', error: 'USER NOT FOUND'})
        }
    }).then(result=>
    {
        let contractorWorkerIDCookie =
        {
            id: result._id
        }
        console.log(result._id)
        res.cookie("contractorWorkerIDCookie", contractorWorkerIDCookie);
        console.log(contractorWorkerIDCookie)
       // return res.json({status: 'ok', data: req.body})
        res.render('HomeContractor')
    })

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
    findAvailableWorkers
}