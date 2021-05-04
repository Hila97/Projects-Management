const companyEmployee = require('../models/CompanyEmployees')
//const auth = require('../middleware/auth')
const express = require("express");
const validationResult = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();


const addCompanyEmployee=(req, res)=>
{
    console.log("add")
    const newCompanyEmployee = new companyEmployee(req.body)
    newCompanyEmployee.save().then(companyEmployee=>{
        console.log(req.body)
        res.json({newCompanyEmployee})
    }).catch(err => {
        console.log(err)
    })
}
const loginOfCompanyEmployee= async (req, res) =>
{
    var userName = req.body.userName
    var password = req.body.password
    companyEmployee.findOne({userName: userName,password: password},function (err,employee)
    {
        if((/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(userName)) == false)
        {
            return res.json({ status: 'error', error: 'INVALID USERNAME' })
        }
        if((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)) == false)
        {
            return res.json({ status: 'error', error: 'INVALID PASSWORD' })
        }

        /*{
            return res.json({ status: 'error', error: 'NOT MATCH PASSWORD' })
        }

         */
        if(err)
        {
            console.log(err)
            return res.status(500).send()
        }
        if(!employee)
        {
            return res.json({ status: 'error', error: 'USER NOT FOUND' })
        }
        return res.json({ status: 'ok', data: req.body })
    })
}

module.exports=
{
        addCompanyEmployee,
        loginOfCompanyEmployee
}