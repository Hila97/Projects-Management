const express = require('express')
//const loginController=require('/controllers/login')
//const bodyParser=require('body-parser')
const port = process.env.PORT || 3000
const app = express()
const mongoose = require ('mongoose')
const Users = require('../models/users')
//conect to mongoDB
const dbURI= 'mongodb+srv://Hodaya:hp1234@mhyhmcluster.d5gdr.mongodb.net/MHYHMdatabase?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> app.listen(port,()=>{console.log(`server is up and running at: http://127.0.0.1:${port}`)}))
    .catch ((err)=>console.log(err))
app.set('view engine','ejs')
app.use(express.static('public'))
app.get('/add-users',(req, res)=>{
 const users= new Users({
  username:'sasa@gmailcom',
  password: 'Aa1234'
 })
 /*users.save()
     .then((result)=>{
       res.send(result)
     })
     .catch((err)=>{
      console.log(err)
     })
*/
})
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


