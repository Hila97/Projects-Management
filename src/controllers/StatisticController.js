const companyEmployee = require('../models/CompanyEmployees')
const contractorWorker = require('../models/ContractorWorker')
const Vacation=require('../models/Vacation')
const Employer=require('../models/Employer')
const Employment = require('../models/Employment')
const AttendanceReportCtrl=require('../models/AttendanceReport')
const ErrorReport=require('../models/ErrorReport')
const Salary=require('../models/Salary')
const moment = require('moment')

async function fieldsOfEmployments(req,res) {

    var fields=[]
    var amount=[]
    Employment.aggregate(
        [
            {
                $group:
                    {
                        _id: "$field",
                        count: { $sum: 1 }
                    }
            },
            {
                $sort : { count : -1, _id: 1 }
            }
        ]
    ).then(field => {
        console.log(field)
        field.forEach((item)=>{
            fields.push(item._id)
            amount.push((item.count))
        })
        console.log(amount)
        console.log(fields)
        res.render('EmployeeViews/StatisticFieldsOfEmployments',{fields:fields,amount:amount})
    })
}

async function employersOfEmployments(req,res)
{
    var companies=[]
    var counter=[]
    var employers=[]
    await   Employment.aggregate(
        [
            {
                $group:
                    {
                        _id: "$employerID",
                        count: { $sum: 1 }
                    }
            },
            {
                $sort : { count : -1, _id: 1 }
            }
        ]
    ).then(x=>{
        console.log("x:",x)
        employers=x
    })
    console.log("employers:",employers)
    let i=0
    var c
    for(i; i<employers.length; i++) {
        await Employer.findById(employers[i]._id,{companyName:1}).then(e=>{
            companies.push(e.companyName)
            counter.push(employers[i].count)
        })
    }
    setTimeout(function(){
        console.log("all the companies",companies)
        console.log("all the companies",counter)
        res.render('EmployeeViews/StatisticEmployers',{companies:companies,counter:counter})
    },100);
}
async function workersOfEmployments(req,res)
{
    const x = req.body.month;
    let thisMonth = moment();
    thisMonth.set('month',x-1).set('date',1)
    let nextMonth=moment();
    nextMonth.set('month',x).set('date',1)
    console.log(thisMonth,nextMonth)
    var d1=new Date(thisMonth)
    var d2=new Date(nextMonth)
    Employment.aggregate(
        [
            {
                $match:
                    {
                        workDate:{$gt:d1,$lt:d2},
                        confirmation:"approved"
                    }
            },
            {
                $group:
                    {
                        _id: "$workerID",
                        count: { $sum: 1 }
                    }
            },
            {
                $sort : { count : -1, _id: 1 }
            }
        ]
    ).then(workers => {
        contractorWorker.countDocuments().then(allWorkers=>{
            console.log(allWorkers)
            console.log("the number of workers are:",workers.length)
            res.render('EmployeeViews/StatisticWorkerGraph',{workers:workers.length,allWorkers:allWorkers,month:x})
        })

       // console.log(allWorkers)
        // if(workers.length==0)
        //     workers=0
       // console.log(workers.length*100/allWorkers)
    })
}
async function avgSalary(req,res)
{
    var salaryAvg=[]
    Salary.aggregate(
        [
            {
                $group:
                    {
                        _id: {
                            "$dateToString": { "format": "%Y-%m-%d", "date": "$date" }
                        },
                        AverageSalary: { $avg: "$totalSalary" },
                        month: { "$first": { "$month": "$date" } }
                    }
            },
            {
                $sort : { month : 1 }
            }
        ]
    ).then(salaries => {
        let flag = 1;
      for(let j=0; j< 12 ;j++)
      {
          flag=1
          for(let i=0;i<salaries.length && flag;i++)
          {
              if(salaries[i].month===j+1)
              {
                  salaryAvg.push(salaries[i].AverageSalary);
                  flag=0;
              }
          }
          if(flag==1)
              salaryAvg.push(0)
      }
        console.log(salaryAvg)
        console.log(salaries)
        res.render('EmployeeViews/StatisticSalaries',{salaryAvg})
    })
}

module.exports={
    fieldsOfEmployments,
    employersOfEmployments,
    workersOfEmployments,
    avgSalary
}