const User=require('../models/user')

const addUser=(req, res)=> {
    console.log("add")
    const newUser = new User(req.body)
    newUser.save().then(user=>{
        console.log(req.body)
            res.json({newUser:user})
    }).catch(err => {
            console.log(err)
        })
}

/*
const addUser=(req, res)=> {
    var newUser = new User(req.body);

// Save the new model instance, passing a callback
    newUser.save(function (err) {
        if (err) console.log("error");
        // saved!
    });
}

 */
/*

const addUser=(req, res)=> {
    let Users = new User({
        username: req.body.username,
        password: req.body.password
    })
    users.save()
        .then(users => {
            res.json({
                message: "User Added Successfully"
            })
        })
        .catch(error => {
            res.json({
                message: "An error occured"
            })
        })
}

 */
module.exports={addUser}