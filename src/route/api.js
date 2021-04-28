const router=require('express').Router()
const user = require('../controllers/userComtroller')


router.post('/addUser',(user.addUser))
/*
router.post('/addUser',(req,res)=>{
user.addUser
});

 */


module.exports=router