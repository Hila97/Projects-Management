const mongoose = require ('mongoose');
const contractorWorkerController = require('../models/ContractorWorker')

const addContractor = (req, res)=>{
    const newContractor=new contractorWorkerController(req.body)
    newContractor.save().then(contractor =>{
        res.json({newContractor})
        console.log("contractor added")
    }).catch(err=>{
        console.log(err)
    })
}


const findAllContractor =(req, res)=>{
    const newContractor=new contractorWorkerController(req.body)
    contractorWorkerController.find()
        .then(contractor =>{
            res.send(contractor)
        })
        .catch(err=>{
            console.log(err)
        })
}


function findContractorByID(req,res){
    contractorWorkerController.find({ID:req.params.ID}).then((result)=>{
        res.send(result)
    })
}

function findContractorByAreaOfResidence(req,res){
    contractorWorkerController.find({areaOfResidence:req.params.areaOfResidence}).then((result)=>{
        res.send(result)
    })
}

function findWorkerByRating(req,res){
    var query={rating:{$gte:req.params.rating}}
    contractorWorkerController.find(query).then((result)=>{
        res.send(result)
    })
}

function findWorkerByExperience(req,res){
    contractorWorkerController.find({experience:{$gte:req.params.experience}}).then((result)=>{
        res.send(result)
    })
}
////////////not good////////////
function findWorkerByHourlyWage(req,res,next){
    var query={hourlyWage:{$gte:req.params.min,$lte:req.params.max}}
    contractorWorkerController.find(query).then((result)=>{
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
    contractorWorkerController.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
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


module.exports = {
    addContractor,
    findAllContractor,
    findContractorByID,
    editProfile,
    findWorkerByRating,
    findWorkerByHourlyWage,
    findWorkerByExperience,
    findContractorByAreaOfResidence
}