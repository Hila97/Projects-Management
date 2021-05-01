const router=require('express').Router()
const companyEmployee=require('../controllers/CompanyEmployeeController')

router.post('/addCompanyEmployee',(companyEmployee.addCompanyEmployee))

module.exports=router