const router=require('express').Router()
const salary= require('../controllers/SalaryController')


router.get('/calculateContractorSalaryForMonth', salary.calculateContractorSalaryForMonth)
router.post('/addSalary', salary.addSalary)
router.get('/findAllSalaries',salary.findAllSalaries)

module.exports=router
