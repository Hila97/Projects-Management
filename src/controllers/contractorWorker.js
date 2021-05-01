const mongoose = require ('mongoose');
const contractorWorker = require('../models/contractorWorker')

const addContractor = (req, res)=>{
    const newContractor=new contractorWorker(req.body)
    newContractor.save().then(contractor =>{
        res.json({newContractor})
        console.log("contractor added")
    }).catch(err=>{
        console.log(err)
    })
}


const findAllContractor =(req, res)=>{
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


const editProfile=(req, res)=>{
    if(!req.body)
        return res
            .status(400)
            .send({message:"error"})
    const  id = req.params.ID
    contractorWorker.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
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


module.exports = {addContractor,findAllContractor,findContractorByID,editProfile}