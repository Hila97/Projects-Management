const router=require('express').Router()
const  vacation=require('../controllers/VacationController')
router.post('/addVacation',vacation.addVacation)
//router.get('/findAvailableWorker/:workDate',vacation.findAvailableWorker)
module.exports=router