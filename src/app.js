const express = require('express')
//const loginController=require('/controllers/login')
//const bodyParser=require('body-parser')
const port = process.env.PORT || 3000
const app = express()
app.set('view engine','ejs')
app.use(express.static('public'))
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

app.listen(port,()=>{
 console.log(`server is up and running at: http://127.0.0.1:${port}`)
})

