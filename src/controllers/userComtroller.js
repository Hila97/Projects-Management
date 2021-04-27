const User=require('../models/user')
const addUser=(req, res)=> {
    const newUser = new User(req.body)
    newUser.save().then(user=>{
        res.json({user:user})
    }).catch(err => {
            console.log(err)
        })
}
module.exports={addUser}