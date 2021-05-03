const router=require('express').Router()
const employer = require('../controllers/EmployerController')
router.post('/addEmployer',(employer.addEmployer))


module.exports=router