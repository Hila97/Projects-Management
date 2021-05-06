//express
const express = require('express')
const app = express()
app.use(express.static('public'))
const axios = require('axios')

//env
const dotenv=require('dotenv')
dotenv.config()

//body parser
const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')
const port = process.env.PORT || 3000

//mongoose
const mongoose = require ('mongoose')

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

//loginController(app)
app.get('/', (req, res)=>{
 res.render('Home')
})

app.get('/addContractorForm', (req, res)=>{
    res.render('addContractorForm')
})

app.get('/login', (req, res)=>{
 res.render('login')
})
app.post('/addContractorForm', function(req, res) {
    var ID = req.body.ID
})
/*
app.post('/contractorWorkerAPI/addContractor', (request, response) => {
    response.json(request.body);
})

app.get('/attandenceReport', (req, res)=>{
    res.render('attandenceReport')
})*/
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
           else{
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
           console.log(data)
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




