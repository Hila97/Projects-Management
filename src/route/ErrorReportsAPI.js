const router=require('express').Router()
const errorReport=require('../controllers/ErrorReportsController')

router.post('/addErrorReport/:reportDate/:attendanceReportID', errorReport.addErrorReport)
router.get('/displayErrorReport/:_id', errorReport.displayErrorReport)
router.get('/findAllErrorReports', errorReport. findAllErrorReports)
router.get('/showErrorReport/:attendanceReportID', errorReport.showErrorReport)


router.get('/NavErrorReport',((req, res) => {
    res.render('EmployeeViews/NavErrorReport')
}))


router.get('/searchContractorErrorReport',((req, res) =>
{
    res.render('EmployeeViews/searchContractorErrorReport')
}))

module.exports=router