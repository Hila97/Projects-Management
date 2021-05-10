const mongoose = require ('mongoose');
const contractorWorker = require('../models/ContractorWorker')
const express = require("express");
const validationResult = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();


const addContractor = (req, res)=>{
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaa")
    console.log(req.cookie)
    const newContractor=new contractorWorker(req.body)
    newContractor.save().then(contractor =>{
        res.json({newContractor})
        console.log("contractor added")
    }).catch(err=>{
        console.log(err)
    })
}


const findAllContractor =(req, res)=>{
    console.log(req.cookies)
    const newContractor=new contractorWorker(req.body)
    contractorWorker.find()
        .then(contractor =>{
            res.send(contractor)
        })
        .catch(err=>{
            console.log(err)
        })

}


function findContractorByID(req,res){
    contractorWorker.find({ID:req.params.ID}).then((result)=>{
        res.send(result)
    })
}

function findContractorByAreaOfResidence(req,res){
    contractorWorker.find({areaOfResidence:req.params.areaOfResidence}).then((result)=>{
        res.send(result)
    })
}


function findContractorByFieldOfEmployment(req,res){
    contractorWorker.find({fieldOfEmployment:req.params.fieldOfEmployment}).then((result)=>{
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

const displayEditProfile= async (req,res)=>{
    let contractor=await contractorWorkerController.findOne({ID:req.params.ID})
    if(contractor){
        res.render('../views/displayProfileContractor',contractor)
    }
    else{
        return res.status(400).send('That contractor ID not valid')
    }
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
        res.cookie("userData", contractorWorkerIDCookie);
        console.log(contractorWorkerIDCookie)
        return res.json({status: 'ok', data: req.body})
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
    displayEditProfile
}