const Salary=require('../models/Salary')
const contractorWorker = require('../models/ContractorWorker')
const attendanceReport= require('../models/AttendanceReport')
const moment = require('moment')

// var d =new Date().toLocaleString();//console.log(d)

const addSalary=(req, res)=>
{
    console.log("add")
    const newSalary = new Salary(req.body)
    newSalary.save().then(Salary=>
    {
        console.log(req.body)
        res.json({newSalary})
    }).catch(err => {
        console.log(err)
    })
}

async function findAllSalaries(req,res)
{
    console.log("find")
    var ID = req.params.ID
    console.log(req.params.ID)
    var ContractorId = await contractorWorker.findOne({ID: req.params.ID}, {_id: 1,})
    const salaries = await Salary.find({workerID:ContractorId},{workerID:1, date:1, totalSalary:1},function(err)
    {
        console.log('asaa')
        if (err)
        {
            console.log(err)
            return res.status(500).send()
        }
    })
    console.log('asaa')
    console.log(salaries)
    if (salaries.length == 0)
            res.render('EmployeeViews/FailureToFindSalaries',{ID})
    else
       res.render('EmployeeViews/ViewSalaries',{salaries})
}


async function calculateContractorSalaryForMonth(req, res)
{
    var ID = req.params.ID
    console.log(req.params.ID)
    //מביא את הפרטים של העובד שמרוצים לחשב עבורו את המשכורת- הid והשכר השעתי
    var ContractorId = await contractorWorker.findOne({ID: req.params.ID},
        {
            _id: 1,
            hourlyWage: 1
        })
    console.log(ContractorId)
    console.log(req.params.ID)
    const month = req.body.month
    let next= parseInt(month) + 1
    const thisM = '2021-' + month + '-01'
    if(parseInt(month)==12)
        next= parseInt(month) -11
    const nextM = '2021-' + next + '-01'

    const thisMonth = moment(new Date(thisM))
    const nextMonth = moment(new Date(nextM))
    console.log(thisMonth, nextMonth)
//מביא את כל הדוחות של החודש הרצוי
    var query =
        {
            contractorWorkerID: ContractorId._id,
            $and:
            [
                {startShift: {$gte: thisMonth}},
                {startShift: {$lt: nextMonth}}
            ]
        }
    const shifts = await attendanceReport.find(query, {startShift: 1, endShift: 1})
    console.log(shifts)
    if (shifts.length == 0)
    {
        res.render('EmployeeViews/FailureToFindAttendanceReportsToCalculate',{ID})
        //res.send("this worker didnt work this month")
    }
    else
    {
        var totalTime=0
        // עובר על כל הדוחות ומחשב את כל השעות שהקבלן עבר החודש
        for (i = 0; i < shifts.length; i++)
        {
            var DailyWork= moment(shifts[i].endShift).diff(moment(shifts[i].startShift))
            totalTime=totalTime+DailyWork
         }
        var totalWork = moment.duration(totalTime)
        var s = Math.floor(totalWork.asHours()) + moment.utc(totalTime).format(":mm:ss")
        var time = s.split(":")
        var hours = time[0]
        var mins= time[1]
        var secs = time[2]
        const hourlyWage=ContractorId.hourlyWage

        console.log(s)
        console.log(hours,mins,secs)

        //  מחשב את המשכורת החודשית שהעובד אמור לקבל לפי השעות שעבד החודש
        const calcSalry= (hours * hourlyWage) + ( mins * (hourlyWage / 60) ) + (secs * (hourlyWage / 3600) )
        const salary=calcSalry.toFixed(2)
        console.log(calcSalry)
        console.log(salary)
        if(parseInt(month)==12)
            next= parseInt(month) -11
        const paySalary = '2021-' + next + '-10'
        var date= new Date(paySalary)
        console.log(date)

        var newSalary= new Salary()
        newSalary.workerID=ContractorId._id
        newSalary.date=date
        newSalary.totalSalary=salary
        newSalary.save(function (err, savedSalary)
        {
            if (err)
            {
                console.log(err)
                return res.status(500).send()
            }

           // return res.json({status: 'salary added ,ok', data: newSalary})
            res.render('HomeEmployee')

        })
    }

}

// -------------
const getThisMonthSalaryByWorkerID = async (req, res) => {
    try {
        const {workerID} = req.params
        // get the month of today date
        let month = moment().format('M') 
        let next = (parseInt(month, 10) +1).toString()
        const thisM = '2021-' + month + '-01'
        const nextM = '2021-' + next + '-01'

        const thisMonth = moment(new Date(thisM))
        const nextMonth = moment(new Date(nextM))

        var query =
        {
            workerID: workerID,
            $and:
            [
                {date: {$gte: thisMonth}},
                {date: {$lt: nextMonth}}
            ]
        }
        const salary = await Salary.findOne(query)
        if(!salary){
            return res.render('Error', {message: 'No salary for this month'})
        }
        res.render('ContractorWorkerViews/thisMonthSalary', {salary: salary.totalSalary})
    } catch (e) {
        console.log(e)
    }
}

module.exports=
    {
        addSalary,
        findAllSalaries,
        calculateContractorSalaryForMonth,
        getThisMonthSalaryByWorkerID
    }



