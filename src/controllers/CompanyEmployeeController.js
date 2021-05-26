const companyEmployee = require('../models/CompanyEmployees')
    //const auth = require('../middleware/auth')
const express = require("express");
const validationResult = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const addCompanyEmployee=async (req, res) => {
    console.log("add")
    console.log(req.cookie.contractorWorkerIDCookie)
    console.log(req.cookie.companyEmployeeIDCookie)
    console.log(req.cookie.employerIDCookie)
    const newCompanyEmployee = new companyEmployee(req.body)
    await newCompanyEmployee.save().then(companyEmployee => {
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
    companyEmployee.findOne({userName: userName, password: password},function (err,employee)
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
            //return res.json({ status: 'error', error: 'USER NOT FOUND' })
            res.render('authViews/errorCompanyEmployeeNotExist')
        }
    }).then(result=>
    {
        let companyEmployeeIDCookie =
            {
                id: result._id
            }
        console.log(result._id)
        res.cookie("companyEmployeeIDCookie", companyEmployeeIDCookie);
        console.log(companyEmployeeIDCookie)
        //return res.json({status: 'ok', data: req.body})
        res.render('HomeEmployee')
    })
}


module.exports=
    {
        addCompanyEmployee,
        loginOfCompanyEmployee
    }
