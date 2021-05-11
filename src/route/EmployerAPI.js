const router=require('express').Router()
const employer = require('../controllers/EmployerController')

router.post('/addEmployer',(employer.addEmployer))
router.post('/loginOfEmployer',(employer.loginOfEmployer))
router.post('/registerOfEmployer',(employer.registerOfEmployer))
router.get('/getBookedEmployeesToday',(employer.getBookedEmployeesToday))
router.get('/getBookedEmployeesFuture/:id',(employer.getBookedEmployeesFuture))
router.get('/getAllEmployers',(employer.findAllE))

router.get('/employerLogin',(req, res) =>
{
    res.render('authViews/employerLogin')
})

router.get('/employerRegister',(req, res) =>
{
    res.render('authViews/employerRegister')
})


module.exports=router