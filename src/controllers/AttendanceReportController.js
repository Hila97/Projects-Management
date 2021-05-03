const AttendanceReport=require('../models/AttendanceReport')

const addAttendanceReport=(req, res)=> {
    console.log("add")
    const newAttendanceReport = new AttendanceReport(req.body)
    newAttendanceReport.save().then(report=>{
        console.log(req.body)
        res.json({newAttendanceReport})
    }).catch(err => {
        console.log(err)
    })
}
const findAllAttendanceReports=(req,res)=>{
    console.log("find")
    AttendanceReport.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports={addAttendanceReport,findAllAttendanceReports}

