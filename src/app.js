//express
const express = require('express')
const app = express()
app.use(express.static('public'))
const axios = require('axios')
const moment = require('moment')
////////////////////////////////////////
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

app.get('/employeesFilters',((req, res) => {
    res.render('employeesFilters')
}))
app.get('/getBookedEmployeesToday',(req, res) => {
    try {
        const fetchBooking = async () =>{
            const {data} = await axios.get('https://project-management-2021-sce.herokuapp.com/employer/getBookedEmployeesToday')
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

app.get('/filterEmploymentsByDate/:BookingDate',(req, res) => {
    try {
        const {BookingDate} = req.params
        const fetchBooking = async () =>{
            const {data} = await axios.get(`https://project-management-2021-sce.herokuapp.com/employment/getEmploymentsByBookingDate/${BookingDate}`)
            console.log(data)
            if(typeof data === 'string'){
                return res.render('Error', {message : data})
            }
            else
            {
                const workerArr = data.map( d => d.workerID)
                res.render('filterEmploymentsByDate',{workerArr : workerArr})
            }
        }

        fetchBooking()
    } catch (e) {
        console.log(e)
    }


})
app.get('/filterEmploymentsByDate',(req, res) => {
    try {
        const fetchBooking = async () =>{
            const {data} = await axios.get('https://project-management-2021-sce.herokuapp.com/employment/getAllEmployees')
            // console.log(data)
            if(typeof data === 'string'){
                return res.render('Error', {message : data})
            }
            else
            {
                const workerArr = data.map( d => d.workerID)
                res.render('filterEmploymentsByDate',{workerArr : workerArr})
            }
        }



        fetchBooking()
    } catch (e) {
        console.log(e)
    }


})

app.get('/filterEmploymentsByMonth/:month',(req, res) => {
    try {
        const {month} = req.params
        const fetchBooking = async () =>{
            const {data} = await axios.get(`https://project-management-2021-sce.herokuapp.com/employment/getEmploymentsByBookingDateMonth/${month}`)
            console.log(data)
            if(typeof data === 'string'){
                return res.render('Error', {message : data})
            }
            else
            {
                const workerArr = data.map( d => d.workerID)
                res.render('filterEmploymentsByMonth',{workerArr : workerArr})
            }
        }

        fetchBooking()
    } catch (e) {
        console.log(e)
    }


})


app.get('/filterEmploymentsByMonth',(req, res) => {
    try {
        const fetchBooking = async () =>{
            const {data} = await axios.get('https://project-management-2021-sce.herokuapp.com/employment/getAllEmployees')
            // console.log(data)
            if(typeof data === 'string'){
                return res.render('Error', {message : data})
            }
            else
            {
                const workerArr = data.map( d => d.workerID)
                res.render('filterEmploymentsByMonth',{workerArr : workerArr})
            }
        }



        fetchBooking()
    } catch (e) {
        console.log(e)
    }


})

// app.get('/FutureBooking',(req, res) => {
//     try {
//         // const {id} = req.params
//         const id = '60897c4e3b16b63e2437bbad'
//         const fetchBooking = async () =>{
//             const {data} = await axios.get(`http://127.0.0.1:3000/employer/getBookedEmployeesFuture/${id}`)
//             //    console.log(data)
//             if(typeof data === 'string'){
//                 return res.render('Error', {message : data})
//             }
//             else{
//                 const workerArr = data.map( d => d.workerID)
//                 res.render('FutureBooking',{workerArr : workerArr})
//             }
//         }
//         fetchBooking()
//     } catch (e) {
//         console.log(e)
//     }
//
// })

app.get('/employerSearch',((req, res) =>
{
    try {
        const fetchEmployers = async () =>{
            const {data} = await axios.get('https://project-management-2021-sce.herokuapp.com/employer/getAllEmployers')
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

app.get('/employerSearch/:employerName',((req, res) =>
{///:employerID
    try {
        const {employerName} = req.params
        //employment/getEmployeesByEmployerID/60897c4e3b16b63e2437bbad`

        const fetchEmployers = async () =>{
            const {data} = await axios.get(`https://project-management-2021-sce.herokuapp.com/employer/getEmployeesByEmployerName/${employerName}`)
            //    console.log(data)
            if(typeof data === 'string'){
                return res.render('Error', {message : data})
            }
            else{
                const employers = [data]
                res.render('employerSearch',{employers : employers})


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

    try {
        const fetchEmployees = async () =>{
            const {data} = await axios.get('https://project-management-2021-sce.herokuapp.com/employment/getAllEmployees')
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

app.get('/filterEmploymentsByStatus/:status',((req, res) =>
{
    const {status} = req.params
    try {
        const fetchEmployees = async () =>{
            const {data} = await axios.get(`https://project-management-2021-sce.herokuapp.com/employment/getEmployeesByStatus/${status}`)
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

app.get('/updateEmploymentsStatus',((req, res) =>
{
    const status = 'Current'
    const id = '6091ae775ce4c02e98d9f99c'
    try {
        const fetchEmployees = async () =>{
            const {data} = await axios.get(`https://project-management-2021-sce.herokuapp.com/employment/updateEmploymentsStatus/${id}/${status}`)
            //    console.log(data)
            if(typeof data === 'string'){
                return res.render('Error', {message : data})
            }
            else{
                const employees = data.map( d => d.workerID)
                res.render('updateEmploymentsStatus',{employees : employees})
            }
        }
        fetchEmployees()
    } catch (e) {
        console.log(e)
    }

}))

/*
app.get('/filterEmploymentsByemployerID',((req, res) =>
{

    try {
        const fetchEmployees = async () =>{
            const {data} = await axios.get('http://127.0.0.1:3000/employment/getAllEmployees')
            //    console.log(data)
            if(typeof data === 'string'){
                return res.render('Error', {message : data})
            }
            else{
                const employees = data.map( d => d.workerID)
                res.render('filterEmploymentsByemployerID',{employees : employees})
            }
        }
        fetchEmployees()
    } catch (e) {
        console.log(e)
    }

}))

 */

/*
app.get('/filterEmploymentsByemployerID/:employerID',((req, res) =>
{
    const {employerID} = req.params
    try {
        const fetchEmployees = async () =>{
            const {data} = await axios.get(`http://127.0.0.1:3000/employment/getEmployeesByEmployerID/${employerID}`)
            console.log(data)
            if(typeof data === 'string'){
                return res.render('Error', {message : data})
            }
            else{
                const employees = data.map( d => d.workerID)
                res.render('filterEmploymentsByemployerID',{employees : employees})
            }
        }
        fetchEmployees()
    } catch (e) {
        console.log(e)
    }

}))

 */
app.get('/filterbycompanyName',((req, res) =>
{
    try {
        const fetchEmployees = async () =>{
            const {data} = await axios.get('https://project-management-2021-sce.herokuapp.com/employer/getAllEmployers')
            //    console.log(data)
            if(typeof data === 'string'){
                return res.render('Error', {message : data})
            }
            else{
                res.render('filterbycompanyName',{employers : data})
            }
        }
        fetchEmployees()
    } catch (e) {
        console.log(e)
    }

}))

app.get('/filterbycompanyName/:companyName',((req, res) =>
{
    const {companyName} = req.params
    try {
        const fetchEmployees = async () =>{
            const {data} = await axios.get(`https://project-management-2021-sce.herokuapp.com/employer/getEmployeesBycompanyName/${companyName}`)
            //    console.log(data)
            if(typeof data === 'string'){
                return res.render('Error', {message : data})
            }
            else{
                res.render('filterbycompanyName',{employers : data})
            }
        }
        fetchEmployees()
    } catch (e) {
        console.log(e)
    }

}))
/*
app.get('/filterEmployeesByposition',((req, res) =>
{
    try {
        const fetchEmployees = async () =>{
            const {data} = await axios.get(`http://127.0.0.1:3000/employer/getAllEmployers`)
              console.log(data)
            if(typeof data === 'string'){
                return res.render('Error', {message : data})
            }
            else{
                //const employees = data.map( d => d.employerID)
                res.render('filterEmployeesByposition',{employees : data})
            }
        }
        fetchEmployees()
    } catch (e) {
        console.log(e)
    }

}))

*/
/*
app.get('/filterEmployeesByposition/:position',((req, res) =>
{
    const {position} = req.params
    try {
        const fetchEmployees = async () =>{
            const {data} = await axios.get(`http://127.0.0.1:3000/employer/getEmployeesByPosition/${position}`)
            //    console.log(data)
            if(typeof data === 'string'){
                return res.render('Error', {message : data})
            }
            else{
               // const employees = data.map( d => d.employerID)
                res.render('filterEmployeesByposition',{employees : data})
            }
        }
        fetchEmployees()
    } catch (e) {
        console.log(e)
    }

}))


*/
/*
app.get('/filterByfieldOfEmployment',((req, res) =>
{
    try {
        const fetchEmployees = async () =>{
            const {data} = await axios.get(`http://127.0.0.1:3000/employer/getAllEmployers`)
            //    console.log(data)
            if(typeof data === 'string'){
                return res.render('Error', {message : data})
            }
            else{
               // const employees = data.map( d => d.employerID)
                res.render('filterByfieldOfEmployment',{employees : data})
            }
        }
        fetchEmployees()
    } catch (e) {
        console.log(e)
    }

}))

 */


/*app.get('/filterByfieldOfEmployment/:fieldOfEmployment',((req, res) =>
{
    const {employerID}= req.params
    try {
        const fetchEmployees = async () =>{
            const {data} = await axios.get(`http://127.0.0.1:3000/employer/filterByfieldOfEmployment/${fieldOfEmployment}`)
            //    console.log(data)
            if(typeof data === 'string'){
                return res.render('Error', {message : data})
            }
            else{
                //const employees = data.map( d => d.employerID)
                res.render('filterByfieldOfEmployment',{employees : data})
            }
        }
        fetchEmployees()
    } catch (e) {
        console.log(e)
    }

}))

 */

app.get('/filterContractorsByDate',((req, res) =>
{
    const{val} = req.params
    console.log(val)
    const today = moment().format('YYYY-MM-DD')
    console.log(today)
    try {
        const fetchBookingByDate = async () =>{
            const {data} = await axios.get(`https://project-management-2021-sce.herokuapp.com/employment/getEmploymentsByBookingDate/${today}`)
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
            const {data} = await axios.get('https://project-management-2021-sce.herokuapp.com/employment/findAllEmployments')
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
mongoose.set('useFindAndModify', false)


