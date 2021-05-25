const router=require('express').Router()
const employment=require('../controllers/EmploymentController')

router.get('/BookForm/:workDate/:workerID',employment.BookForm)
router.post('/addEmployment/:workDate',employment.addEmployment)
router.get('/findAllEmployments',employment.findAllEmployments)
router.get('/findFutureEmployment',employment.findFutureEmployment)
router.get('/findTodayEmployment',employment.findTodayEmployment)
//router.put('/updateEmploymentStatus',employment.updateEmploymentStatus)
//router.get('/findFutureEmployment/:employerID',employment.findFutureEmployment)
router.get('/findTodayEmployment/:employerID', employment.findTodayEmployment)
//router.put('/updateEmploymentToday/:employerID',employment.updateEmploymentToday)
router.get('/filterEmployeesByStatus/:status',employment.filterEmployeesByStatus)
router.get('/filterEmploymentsByBookingDate/:BookingDate', employment.filterEmploymentsByBookingDate) // the date should be inserted like this '2021-05-03'
router.get('/filterEmploymentsByBookingMonth/:month', employment.filterEmploymentsByBookingMonth)
router.get('/getAllEmployees', employment.getAllEmployees)
router.get('/getEmploymentsList', employment.getEmploymentsList)
router.get('/history',employment.findPastEmployments)
router.post('/rateEmployment',employment.rateEmployment)
router.get('/pastWorkers',(req, res)=>{
    res.render('EmployerViews/PastWorkers',{names})
})

//router.put('/updateEmploymentToday/:employerID',employment.updateEmploymentToday)


module.exports =router