const companyEmployee = require('../models/companyEmployees')

const addCompanyEmployee=(req, res)=> {
    console.log("add")
    const newCompanyEmployee = new companyEmployee(req.body)
    newCompanyEmployee.save().then(companyEmployee=>{
        console.log(req.body)
        res.json({newCompanyEmployee})
    }).catch(err => {
        console.log(err)
    })
}
module.exports={addCompanyEmployee}