const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const path = require('path');

app.get('/', (req, res)=>{
 res.sendFile(path.join(__dirname + '/Home.html'));
});
/*
app.get('/',(req,res)=>{
 res.send('hello world')
})
app.get('/profile',(req,res)=>{
 res.send('profile')
})
*/
app.listen(port,()=>{
 console.log(`server is up and running at: http://127.0.0.1:${port}`)
})

