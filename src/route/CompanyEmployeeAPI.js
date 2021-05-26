const router=require('express').Router()
const validationResult = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const companyEmployee=require('../controllers/CompanyEmployeeController')


router.post('/addCompanyEmployee',(companyEmployee.addCompanyEmployee))
router.post('/loginOfCompanyEmployee',(companyEmployee.loginOfCompanyEmployee))
router.get('/CompanyEmployeeLogin',(req, res) =>
{
    res.render('authViews/companyEmployeeLogin')
})

router.get('/addContractorForm', (req, res)=>{
res.render('addContractorForm')
})

router.get('/searchContractorWorker', (req, res)=>{
    res.render('EmployeeViews/ContractorWorkerInformation')
})
router.get('/ViewAttendanceReports', (req, res)=>{
    res.render('EmployeeViews/ViewAttendanceReports')
})
router.get('/ViewSalaries', (req, res)=>{
    res.render('EmployeeViews/ViewSalaries')
})

module.exports=router