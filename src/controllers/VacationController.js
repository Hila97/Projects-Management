const Vacation=require('../models/Vacation')

const addVacation=(req, res)=> {
    console.log("add")
    const newVacation = new Vacation(req.body)
    newVacation.save().then(vacation=>{
        console.log(req.body)
        res.json({newVacation})
    }).catch(err => {
        console.log(err)
    })
}
const findAllVacations=(req,res)=>{
    console.log("find")
    Vacation.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
}
/*
const findUserById=(req,res)=>{
    User.findById('60894503dfb11833a47c4f98')
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
}

 */
module.exports={addVacation,findAllVacations}

