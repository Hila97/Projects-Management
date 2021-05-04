const router=require('express').Router()
const employer = require('../controllers/EmployerController')

router.post('/addEmployer',(employer.addEmployer))
router.post('/loginOfEmployer',(employer.loginOfEmployer))
router.post('/registerOfEmployer',(employer.registerOfEmployer))


module.exports=router