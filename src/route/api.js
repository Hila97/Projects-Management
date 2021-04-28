const router=require('express').Router()
const user = require('../controllers/userComtroller')
const s=require('../controllers/SalaryController')
const employer = require('../controllers/employerController')
const companyEmployee =require('../controllers/companyEmployeeController')
const bankAccount = require('../controllers/BankAccountController')

router.post('/addUser',(user.addUser))
router.post('/findAllUsers',(user.findAllUsers))
router.post('/findUserById',(user.findUserById))
router.post('/addEmployer',(employer.addEmployer))
router.post('/addCompanyEmployee',(companyEmployee.addCompanyEmployee))
router.post('/addBankAccount',(bankAccount.addBankAccount))
router.post('/addSalary',s.addSalary)



module.exports=router