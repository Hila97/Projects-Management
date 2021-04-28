const router=require('express').Router()

const user = require('../controllers/userComtroller')
const employer = require('../controllers/employerController')
const companyEmployee =require('../controllers/companyEmployeeController')
const bankAccount = require('../controllers/BankAccountController')

router.post('/addUser',(user.addUser))
router.post('/addEmployer',(employer.addEmployer))
router.post('/addCompanyEmployee',(companyEmployee.addCompanyEmployee))
router.post('/addBankAccount',(bankAccount.addBankAccount))
module.exports=router