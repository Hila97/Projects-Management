const router=require('express').Router()
const user = require('../controllers/userComtroller')
const contractorWorker = require('../controllers/ContractorWorkerController')
const attendanceReport = require('../controllers/AttendanceReportController')

router.post('/addAttendanceReport', attendanceReport.addAttendanceReport)
router.post('/addUser',(user.addUser))
router.post('/findAllUsers',(user.findAllUsers))
router.post('/findUserById',(user.findUserById))

router.post('/addContractor',contractorWorker.addContractor)



module.exports=router
