const router=require('express').Router()
const employer = require('../controllers/EmployerController')

router.post('/addEmployer',(employer.addEmployer))
router.post('/loginOfEmployer',(employer.loginOfEmployer))
router.post('/registerOfEmployer',(employer.registerOfEmployer))
router.get('/getBookedEmployeesToday',(employer.getBookedEmployeesToday))
router.get('/getBookedEmployeesFuture/:id',(employer.getBookedEmployeesFuture))


module.exports=router