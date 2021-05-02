const router=require('express').Router()
const user = require('../controllers/userComtroller')
const s=require('../controllers/SalaryController')
const bankAccount = require('../controllers/BankAccountController')
const bookingf = require('../controllers/bookingf')

router.post('/addUser',(user.addUser))
router.get('/findAllUsers',(user.findAllUsers))
router.get('/findUser/:username',user.findUser)
router.post('/findUserById',(user.findUserById))
router.post('/addBankAccount',(bankAccount.addBankAccount))
router.post('/addSalary',s.addSalary)
router.post('/bookingf',bookingf.booking)



module.exports=router