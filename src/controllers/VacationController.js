const Vacation=require('../models/Vacation')

const addVacation=(req, res)=> {
    console.log("add")
    const newVacation = new Vacation({workerID: req.cookies.contractorWorkerIDCookie.id, departureDate: req.body.departureDate,returningDate:req.body.returningDate})
    newVacation.save().then(vacation=>{
        console.log(req.cookies.contractorWorkerIDCookie.id)
        console.log(req.body)
        res.render('HomeContractor')
    }).catch(err => {
        console.log(err)
    })
}
const findAllVacations=(req,res)=>{
    console.log("find vaca")
    console.log(req.cookies)
    Vacation.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
}
/*
function findAvailableWorker(req,res,next){
    var query={departureDate:{$gte:req.params.workDate},returningDate:{$lte: req.params.workDate}}
    var workerIdList=Vacation.find(query).then((result)=>{
        res.send(result)
    })
}

 */


module.exports=
    {
        addVacation,
        findAllVacations
    }

