const Employment=require('../models/Employment')

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
module.exports={addEmployment,findAllEmployments}

