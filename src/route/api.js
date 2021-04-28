const router=require('express').Router()
const user = require('../controllers/userComtroller')

router.post('/addUser',(user.addUser))

module.exports=router