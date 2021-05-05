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


const Updatestatus= async (req,res)=>{
   const {workerID,status}= req.body
    try{
        const employesatus = await Employment.findOneAndUpdate({status : {"$gte": next}}).populate('status')
        if(next=="close"){
         //   res.save(next)
            res.send("you close")
            return
        }
        if(next=="cancel"){
            res.send("you cancel")
            return
        }
       
       return  res.json(employestatus)
    }catch(e){
        console.log(e)
    }  
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
function findFutureEmployment(req,res,next)
{
    var query=
        {
            employerID: req.params.employerID,
            status: 'Future'
        }
    Employment.find(query).then((result)=>{
    res.send(result)
}).catch(next)
}
///not good, should find a good query
function updateEmploymentToday(req,res,next)
{
    var date =new Date("2021-05-03")
    console.log(date, date.getDate)
    var date2=new Date().setDate(date.getDate()+1)
    var q={
        employerID: req.params.employerID,
        workDate:{$gte:date,$lt:date2}
    }
    Employment.updateMany(q,{$set: {status: 'Current'}}).then((result)=>{
        //res.send(result)
        console.log("updated successfully")
    }).catch(next)
}
function findTodayEmployment(req,res,next)
{
    var query=
        {
            employerID: req.params.employerID,
            status: 'Current'
        }

    Employment.find(query).then((result)=>{
        res.send(result)
    }).catch(next)
}
function updateEmploymentStatus(req,res,next)
{
    Employment.findByIdAndUpdate(req.params._id,{status:req.params.status}).then(employment=>{
    console.log(req.body)
    res.json(req.body)
}).catch(next)
}
module.exports={addEmployment,findAllEmployments,findFutureEmployment,findTodayEmployment,updateEmploymentStatus,updateEmploymentToday}

