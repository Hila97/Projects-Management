const router=require('express').Router()
const users = require('../controllers/userComtroller')
const employer = require('../controllers/employerController')

router.post('/addUser',(users.addUser))
router.post('/addEmployer',(employer.addEmployer))
module.exports=router