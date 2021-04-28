const Employer=require('../models/employer')

const addEmployer=(req, res)=> {
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
module.exports={addEmployer}