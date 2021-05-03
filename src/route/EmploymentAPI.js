const router=require('express').Router()
const employment=require('../controllers/EmploymentController')
router.post('/addEmployment',employment.addEmployment)
router.get('/findAllEmployments',employment.findAllEmployments)
router.get('/findFutureEmployment/:employerID',employment.findFutureEmployment)
router.get('/findTodayEmployment/:employerID',employment.findTodayEmployment)
router.put('/updateEmploymentStatus/:_id/:status',employment.updateEmploymentStatus)
router.put('/updateEmploymentToday/:employerID',employment.updateEmploymentToday)


module.exports=router