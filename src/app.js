//express
const express = require('express')
const app = express()
app.use(express.static('public'))
const axios = require('axios')
const moment = require('moment')

//env
const dotenv=require('dotenv')
dotenv.config()

//use cookie
var cookieParser = require('cookie-parser')
app.use(cookieParser())

//body parser
const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')
const port = process.env.PORT || 3000

//mongoose
const mongoose = require ('mongoose')
//dbURI= 'mongodb+srv://Hodaya:hp1234@mhyhmcluster.d5gdr.mongodb.net/MHYHMdatabase?retryWrites=true&w=majority'
//connect to mongoDB
mongoose.connect(process.env.dbURI,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then((result)=> {
     console.log('connected')
    })
    .catch ((err)=>console.log(err))

//routers
app.use('/user',require('./route/api'))
app.use('/attendanceReport',require('./route/AttendanceReportAPI'))
app.use('/companyEmployee',require('./route/CompanyEmployeeAPI'))
app.use('/contractorWorker',require('./route/ContractorWorkerAPI'))
app.use('/employer',require('./route/EmployerAPI'))
app.use('/employment',require('./route/EmploymentAPI'))
app.use('/errorReport',require('./route/ErrorReportsAPI'))
app.use('/vacation',require('./route/VacationAPI'))
app.use('/api',require('./route/api'))
///try
app.use('/auth',require('./route/authAPI'))
//error handling
app.use(function (err,req,res,next){
    res.status(422).send({error:err.message})
})
app.listen(port,()=>{console.log(`server is up and running at: http://127.0.0.1:${port}`)})




/*--------------------------------GET HTMLS---------------------------------*/
//loginController(app)
app.get('/', (req, res)=>{
 res.render('HomeNavUser')
})

app.get('/addContractorForm', (req, res)=>{
    res.render('addContractorForm')
})
app.get('/HomeNavUser', (req, res)=>{
    res.render('HomeNavUser')
})

app.get('/ContractorHome', (req, res)=>{
    res.render('HomeContractor')
})

app.get('/EmployerHome', (req, res)=>{
    res.render('HomeEmployer')
})

app.get('/EmployeeHome', (req, res)=>{
    res.render('HomeEmployee')
})

app.get('/login', (req, res)=>{
 res.render('login')
})

app.get('/attandenceReport', (req, res)=>{
    res.render('attandenceReport')
})
app.get('/profile/:name',(req, res) => {
 var data={age:23, job:'student'}
 res.render('profile',{person: req.params.name,data:data})
})
app.get('/SearchContractorWorker',((req, res) => {
    res.render('SearchContractorWorker')
}))

app.get('/Booking',(req, res) => {
    try {
        const fetchBooking = async () =>{
           const {data} = await axios.get('http://127.0.0.1:3000/employer/getBookedEmployeesToday') 
           if(typeof data === 'string'){
                return res.render('Error', {message : data})
           }
           else
           {
            const workerArr = data.map( d => d.workerID)
            res.render('Booking',{workerArr : workerArr})
           }
        }
        fetchBooking()
    } catch (e) {
        console.log(e)
    }
   
   })

   
app.get('/FutureBooking',(req, res) => {
    try {
        const fetchBooking = async () =>{
           const {data} = await axios.get('http://127.0.0.1:3000/employer/getBookedEmployeesFuture/60897c4e3b16b63e2437bbad') 
        //    console.log(data)
           if(typeof data === 'string'){
                return res.render('Error', {message : data})
           }
           else{
            const workerArr = data.map( d => d.workerID)
            res.render('FutureBooking',{workerArr : workerArr})
           }
        }
        fetchBooking()
    } catch (e) {
        console.log(e)
    }
   
   })

app.get('/employerSearch',((req, res) =>
{
    try {
        const fetchEmployers = async () =>{
           const {data} = await axios.get('http://127.0.0.1:3000/employer/getAllEmployers') 
        //    console.log(data)
           if(typeof data === 'string'){
                return res.render('Error', {message : data})
           }
           else{
            
            res.render('employerSearch',{employers : data})
           }
        }
        fetchEmployers()
    } catch (e) {
        console.log(e)
    }

    
}))

app.get('/employerRegister',((req, res) =>
{
    res.render('employerRegister')
}))

app.get('/filterEmploymentsByStatus',((req, res) =>
{
    const status = 'Current'
    try {
        const fetchEmployees = async () =>{
           const {data} = await axios.get(`http://127.0.0.1:3000/employment/getEmployeesByStatus/${status}`) 
        //    console.log(data)
           if(typeof data === 'string'){
                return res.render('Error', {message : data})
           }
           else{
            const employees = data.map( d => d.workerID)
            res.render('filterEmploymentsByStatus',{employees : employees})
           }
        }
        fetchEmployees()
    } catch (e) {
        console.log(e)
    }

}))

app.get('/filterContractorsByDate',((req, res) =>
{
    // const{val} = req.params
    // console.log(val)
    // const today = moment().format('YYYY-MM-DD')
    // console.log(today)
    // try {
    //     const fetchBookingByDate = async () =>{
    //        const {data} = await axios.get(`http://127.0.0.1:3000/employment/getEmploymentsByBookingDate/${today}`) 
    //     //    console.log(data)
    //        if(typeof data === 'string'){
    //             return res.render('Error', {message : data})
    //        }
    //        else{
    //         const employees = data.map( d => d.workerID)
    //         res.render('filterContractors',{employees : employees})
    //        }
    //     }
    //     fetchBookingByDate()
    // } catch (e) {
    //     console.log(e)
    // }
    res.render('filterContractorsByDate')
}))

app.get('/employmentsList',((req, res) =>
{
    try {
        const fetchEmployments = async () =>{
           const {data} = await axios.get('http://127.0.0.1:3000/employment/findAllEmployments') 
        //    console.log(data)
           if(typeof data === 'string'){
                return res.render('Error', {message : data})
           }
           else{
           
            res.render('employmentsList',{employments : data})
           }
        }
        fetchEmployments()
    } catch (e) {
        console.log(e)
    }

}))

app.get('/employerLogin',((req, res) =>
{
    res.render('employerLogin')
}))

app.get('/contractorWorkerLogin',((req, res) =>
{
    res.render('contractorWorkerLogin')
}))

app.get('/CompanyEmployeeLogin',((req, res) =>
{
    res.render('CompanyEmployeeLogin')
}))


