const router=require('express').Router()
const user = require('../controllers/userComtroller')

router.post('/addUser',(user.addUser))
router.post('/findAllUsers',(user.findAllUsers))
router.post('/findUserById',(user.findUserById))





module.exports=router
