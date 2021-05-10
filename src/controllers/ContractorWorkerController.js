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


function findContractorByFieldOfEmployment(req,res){
    contractorWorkerController.find({fieldOfEmployment:req.params.fieldOfEmployment}).then((result)=>{
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
    contractorWorkerController.findOneAndUpdate(id, req.body)
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
    contractorWorkerController.findOne({userName: userName, password: password}, function (err, contractorWorker)
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
        if (!contractorWorker)
        {
            return res.json({status: 'error', error: 'USER NOT FOUND'})
        }

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