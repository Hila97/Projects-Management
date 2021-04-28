const ErrorReport=require('../models/ErrorReport')

const addErrorReport=(req, res)=> {
    console.log("add")
    const newErrorReport = new ErrorReport(req.body)
    newErrorReport.save().then(errorReport=>{
        console.log(req.body)
        res.json({newErrorReport})
    }).catch(err => {
        console.log(err)
    })
}
const findAllErrorReports=(req,res)=>{
    console.log("find")
    ErrorReport.find()
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
module.exports={addErrorReport,findAllErrorReports}

