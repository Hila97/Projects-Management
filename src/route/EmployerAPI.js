const router=require('express').Router()
const employer = require('../controllers/EmployerController')

router.post('/addEmployer',(employer.addEmployer))
router.post('/loginOfEmployer',(employer.loginOfEmployer))
router.post('/registerOfEmployer',(employer.registerOfEmployer))
router.get('/getBookedEmployeesToday',(employer.getBookedEmployeesToday))
//router.get('/getBookedEmployeesFuture/:id',(employer.getBookedEmployeesFuture))
router.get('/getAllEmployers',(employer.findAllE))
//router.get('/getEmployeesByposition/:employerID',employer.getEmployeesByposition)
router.get('/getEmployeesBycompanyName/:companyName',employer.getEmployeesBycompanyName)
router.get('/getEmployeesByEmployerName/:employerName',employer.getEmployeesByEmployerName)
//router.get('/filterByfieldOfEmployment/:fieldOfEmployment',employer.filterByfieldOfEmployment)

router.get('/employerLogin',(req, res) =>
{
    res.render('authViews/employerLogin')
})

router.get('/employerRegister',(req, res) =>
{
    res.render('authViews/employerRegister')
})

router.get('/search',(((req, res) => {
    res.render('EmployerViews/SearchContractorWorker')
})))
module.exports=router