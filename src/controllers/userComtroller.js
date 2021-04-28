const User=require('../models/user')

const addUser=(req, res)=> {
    console.log("add")
    const newUser = new User(req.body)
    newUser.save().then(user=>{
        console.log(req.body)
            res.json({newUser})
    }).catch(err => {
            console.log(err)
        })
}
const findAllUsers=(req,res)=>{
    console.log("find")
    User.find()
        .then((result)=>{
            res.send(result)
            })
        .catch((err)=>{
            console.log(err)
        })
}
const findUserById=(req,res)=>{
    User.findById('60894503dfb11833a47c4f98')
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
}
module.exports={addUser,findAllUsers,findUserById}

