const router=require('express').Router()
const validationResult = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const companyEmployee=require('../controllers/CompanyEmployeeController')


router.post('/addCompanyEmployee',(companyEmployee.addCompanyEmployee))
router.post('/loginOfCompanyEmployee',(companyEmployee.loginOfCompanyEmployee))





module.exports=router