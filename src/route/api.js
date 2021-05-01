const router=require('express').Router()
const user = require('../controllers/userComtroller')
const contractor = require('../controllers/contractorWorker')
const s=require('../controllers/SalaryController')
const employer = require('../controllers/employerController')
const companyEmployee =require('../controllers/companyEmployeeController')
const bankAccount = require('../controllers/BankAccountController')

router.post('/addUser',(user.addUser))
router.post('/findAllUsers',(user.findAllUsers))
router.post('/findUserById',(user.findUserById))
router.post('/addEmployer',(employer.addEmployer))
router.post('/addContractor',(contractor.addContractor))
router.get('/findContractorByID/:ID',contractor.findContractorByID)
router.post('/editProfile',(contractor.editProfile))
router.get('/findAllContractor',(contractor.findAllContractor))
router.post('/addCompanyEmployee',(companyEmployee.addCompanyEmployee))
router.post('/addBankAccount',(bankAccount.addBankAccount))
router.post('/addSalary',(s.addSalary))



module.exports=router