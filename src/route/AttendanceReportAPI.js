const router=require('express').Router()
const attendanceReport = require('../controllers/AttendanceReportController')

router.post('/addAttendanceReport', attendanceReport.addAttendanceReport)
router.get('/findAllAttendanceReports', attendanceReport.findAllAttendanceReports)
router.get('/findAttendanceById', attendanceReport.findAttendanceById)
router.post('/editExistingTime', attendanceReport.editExistingTime)
router.post('/editEnteringTime', attendanceReport.editEnteringTime)
router.post('/editStartBreak', attendanceReport.editStartBreak)
router.post('/editEndBreak', attendanceReport.editEndBreak)


module.exports=router