const User=require('../models/user')

function addUser(req, res,next) {
    console.log("add")
    User.create(req.body).then(u=>{
        console.log(req.body)
        res.json({name:req.body.username})
    }).catch(next)
    /*
    var newUser = new User(req.body)
    newUser.save().then(user=>{
        console.log(req.body)
            res.json({newUser})
    }).catch(err => {
            console.log(err)
        })
     */
}

function findUser(req,res){
    User.find({username:req.params.username}).then((result)=>{
        res.send(result)
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

module.exports={addUser,findAllUsers,findUserById,findUser}

