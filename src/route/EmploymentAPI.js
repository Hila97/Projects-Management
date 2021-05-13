const router=require('express').Router()
const employment=require('../controllers/EmploymentController')

router.get('/BookForm/:workDate/:workerID',employment.BookForm)
router.post('/addEmployment/:workDate',employment.addEmployment)
router.get('/findAllEmployments',employment.findAllEmployments)
router.get('/findFutureEmployment',employment.findFutureEmployment)
router.get('/findTodayEmployment',employment.findTodayEmployment)
router.put('/updateEmploymentStatus',employment.updateEmploymentStatus)
//router.get('/findFutureEmployment/:employerID',employment.findFutureEmployment)
router.get('/findTodayEmployment/:employerID',employment.findTodayEmployment)
router.put('/updateEmploymentsStatus/:workerID/:status',employment.updateEmploymentStatus)
//router.put('/updateEmploymentToday/:employerID',employment.updateEmploymentToday)
router.get('/getEmployeesByEmployerID/:employerID',employment.getEmployeesByEmployerID)
router.get('/getEmployeesByEmployerIDAndStatus/:employerID/:status',employment.getEmployeesByEmployerIDAndStatus)
router.get('/getEmployeesByStatus/:status',employment.getEmployeesByStatus)
//router.get('/getEmploymentsByWorkDate/:WorkDate',employment.getEmploymentsByWorkDate) // the date should be inserted like this '2021-05-03'
router.get('/getEmploymentsByBookingDate/:BookingDate',employment.getEmploymentsByBookingDate) // the date should be inserted like this '2021-05-03'
router.get('/getEmploymentsByBookingDateMonth/:month',employment.getEmploymentsByBookingDateMonth)
router.put('/updateEmploymentStatus/:_id/:status',employment.updateEmploymentStatus)
router.get('/getAllEmployees',employment.getAllEmployees)



//router.put('/updateEmploymentToday/:employerID',employment.updateEmploymentToday)


module.exports =router