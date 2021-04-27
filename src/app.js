//express
const express = require('express')
const app = express()
//env
const dotenv=require('dotenv')
dotenv.config()
//const bodyParser=require('body-parser')
const port = process.env.PORT || 3000
//router
const router=require('./route/api')
//mongoose
const mongoose = require ('mongoose')
//connect to mongoDB
mongoose.connect(process.env.dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> {
     console.log('connected')
    })
    .catch ((err)=>console.log(err))
app.set('view engine','ejs')
app.use(express.static('public'))
app.use('/',router)
app.listen(port,()=>{console.log(`server is up and running at: http://127.0.0.1:${port}`)})

//loginController(app)
app.get('/', (req, res)=>{
 res.render('Home')
})
app.get('/login', (req, res)=>{
 res.render('login')
})
app.get('/profile/:name',(req, res) => {
 var data={age:23, job:'student'}
 res.render('profile',{person: req.params.name,data:data})
})





