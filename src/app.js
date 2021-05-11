//express
const express = require('express')
const app = express()
app.use(express.static('public'))
const axios = require('axios')
const moment = require('moment')

//env
//const dotenv=require('dotenv')
//dotenv.config()

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
dbURI= 'mongodb+srv://Hodaya:hp1234@mhyhmcluster.d5gdr.mongodb.net/MHYHMdatabase?retryWrites=true&w=majority'
//connect to mongoDB
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then((result)=> {
     console.log('connected')
    })
    .catch ((err)=>console.log(err))

//routers
//app.use('/user',require('./route/api'))
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



const Employment=require('./models/Employment')
async function updateEmploymentToday() {
    var date = new Date()
    date.setDate(date.getDate()-1)
    var date2 = new Date()
    date2.setDate(date.getDate()+1)
    var q = {
        // employerID: req.body.employerID,
        workDate: {$gt: date, $lte: date2}
    }
    await Employment.updateMany(q, {$set: {status: 'Current'}}).then((result) => {
        console.log('updated successfully')
    }).catch(e=>{
        console.log(e)
    })

}

/*--------------------------------GET HTMLS---------------------------------*/
//loginController(app)
app.get('/', (req, res)=>{
 res.render('HomeNavUser')
})

app.get('/addContractorForm', (req, res)=>{
    res.render('addContractorForm')
})







app.get('/editProfile', (req, res)=>{
    res.render('editProfileContractor')
})

app.get('/attandenceReport', (req, res)=>{
    res.render('attandenceReport')
})

app.get('/book',(((req, res) => {
    res.render('BookEmployment')
})))
app.get('/SearchContractorWorker',((req, res) => {
    res.render('SearchContractorWorker')
}))

app.get('/getBookedEmployeesToday',(req, res) => {
    try {
        const fetchBooking = async () =>{
           const {data} = await axios.get('http://127.0.0.1:3000/employer/getBookedEmployeesToday') 
           if(typeof data === 'string'){
                return res.render('Error', {message : data})
           }
           else
           {
            const workerArr = data.map( d => d.workerID)
            res.render('getBookedEmployeesToday',{workerArr : workerArr})
           }
        }
        fetchBooking()
    } catch (e) {
        console.log(e)
    }


   })

   
app.get('/FutureBooking',(req, res) => {
    try {
        // const {id} = req.params
        const id = '60897c4e3b16b63e2437bbad'
        const fetchBooking = async () =>{
           const {data} = await axios.get(`http://127.0.0.1:3000/employer/getBookedEmployeesFuture/${id}`)
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

app.get('/filterEmploymentsByStatus',((req, res) =>
{
    const status = 'Current'
    // const {status} = req.params
    try {
        const fetchEmployees = async () =>{
           const {data} = await axios.get(`http://127.0.0.1:3000/employment/getEmployeesByStatus/${status}`) 
           console.log(data)
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


app.get('/updateEmploymentStatus',((req, res) =>
{
   const status = 'Current'
   const id = '6091ae775ce4c02e98d9f99c'
    try {
        const fetchEmployees = async () =>{
           const {data} = await axios.get(`http://127.0.0.1:3000/employment/updateEmploymentStatus/${id}/${status}`)
        //    console.log(data)
           if(typeof data === 'string'){
                return res.render('Error', {message : data})
           }
           else{
            const employees = data.map( d => d.workerID)
            res.render('updateEmploymentStatus',{employees : employees})
           }
        }
        fetchEmployees()
    } catch (e) {
        console.log(e)
    }

}))

//111111111
app.get('/filterbycompanyName',((req, res) =>
{
    const companyName = 'Asus'
    try {
        const fetchEmployees = async () =>{
           const {data} = await axios.get(`http://127.0.0.1:3000/employment/getEmployeesBycompanyName/${companyName}`)
        //    console.log(data)
           if(typeof data === 'string'){
                return res.render('Error', {message : data})
           }
           else{
            const employees = data.map( d => d.employerID)
            res.render('filterbycompanyName',{employees : employees})
           }
        }
        fetchEmployees()
    } catch (e) {
        console.log(e)
    }

}))
//111111111
app.get('/filterEmployeesByposition',((req, res) =>
{
    //const status = 'Current'
    try {
        const fetchEmployees = async () =>{
           const {data} = await axios.get('http://127.0.0.1:3000/employment/getEmployeesByposition/manager')
        //    console.log(data)
           if(typeof data === 'string'){
                return res.render('Error', {message : data})
           }
           else{
            const employees = data.map( d => d.employerID)
            res.render('filterEmployeesByposition',{employees : employees})
           }
        }
        fetchEmployees()
    } catch (e) {
        console.log(e)
    }

}))
//111111111
app.get('/filterByfieldOfEmployment',((req, res) =>
{
    //const status = 'Current'
    try {
        const fetchEmployees = async () =>{
           const {data} = await axios.get('http://127.0.0.1:3000/employment/filterByfieldOfEmployment/Security And Safety')
        //    console.log(data)
           if(typeof data === 'string'){
                return res.render('Error', {message : data})
           }
           else{
            const employees = data.map( d => d.employerID)
            res.render('filterByfieldOfEmployment',{employees : employees})
           }
        }
        fetchEmployees()
    } catch (e) {
        console.log(e)
    }

}))

app.get('/filterContractorsByDate',((req, res) =>
{
    const{val} = req.params
    console.log(val)
    const today = moment().format('YYYY-MM-DD')
    console.log(today)
    try {
        const fetchBookingByDate = async () =>{
           const {data} = await axios.get(`http://127.0.0.1:3000/employment/getEmploymentsByBookingDate/${today}`)
        //    console.log(data)
           if(typeof data === 'string'){
                return res.render('Error', {message : data})
           }
           else{
            const employees = data.map( d => d.workerID)
            res.render('filterContractors',{employees : employees})
           }
        }
        fetchBookingByDate()
    } catch (e) {
        console.log(e)
    }
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



