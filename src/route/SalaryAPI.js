const router=require('express').Router()
const salary= require('../controllers/SalaryController')


router.post('/calculateContractorSalaryForMonth/:ID', salary.calculateContractorSalaryForMonth)

router.post('/addSalary', salary.addSalary)
router.get('/findAllSalaries',salary.findAllSalaries)
router.get('/getThisMonthSalaryByWorkerID/:workerID',salary.getThisMonthSalaryByWorkerID)


router.get('/EmployeeSalaryAndReportOption/:ID',(req,res)=>
{
    var ID= req.params.ID
    console.log(ID)
    console.log("aaaa")
    res.render('EmployeeViews/EmployeeSalaryAndReportOption',{ID})
})

module.exports=router
