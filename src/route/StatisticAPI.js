const router=require('express').Router()
const Statistics=require('../controllers/StatisticController')
router.get('/',(req, res) => {
    res.render('EmployeeViews/Statistics')
})
router.get('/fieldsOfEmployments',Statistics.fieldsOfEmployments)
router.get('/employersOfEmployments',Statistics.employersOfEmployments)
router.post('/workersOfEmployments',Statistics.workersOfEmployments)
router.get('/avgSalary',Statistics.avgSalary)
router.get('/chooseMonth',((req, res) => {
    res.render('EmployeeViews/StatisticWorkersInMonth')
}))


module.exports =router