const Salary=require('../models/Salary')

const addSalary=(req, res)=> {
    console.log("add")
    const newSalary = new Salary(req.body)
    newSalary.save().then(Salary=>{
        console.log(req.body)
        res.json({newSalary})
    }).catch(err => {
        console.log(err)
    })
}
const findAllSalaries=(req,res)=>{
    console.log("find")
    Salary.find()
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
module.exports={addSalary,findAllSalaries}

