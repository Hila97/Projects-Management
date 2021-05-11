const router = require('express').Router()
const contractorWorker = require('../controllers/ContractorWorkerController')

router.get('/displayProfile/:ID',contractorWorker.displayEditProfile)
router.post('/editProfile/:ID',contractorWorker.editProfile)
router.post('/addContractor',contractorWorker.addContractor)
router.get('/findAllContractor',contractorWorker.findAllContractor)
router.get('/findWorkerByRating',(contractorWorker.findWorkerByRating))
router.get('/findWorkerByHourlyWage',contractorWorker.findWorkerByHourlyWage)
router.get('/findContractorByFieldOfEmployment',contractorWorker.findContractorByFieldOfEmployment)
router.get('/findContractorByID/:ID',contractorWorker.findContractorByID)
router.post('/editProfile',(contractorWorker.editProfile))
router.get('/findAllContractor',(contractorWorker.findAllContractor))
//router.get('/findWorkerByHourlyWage/:min&max',contractorWorker.findWorkerByHourlyWage)

router.post('/findAvailableWorkers',contractorWorker.findAvailableWorkers)
router.post('/loginOfContractorWorker',(contractorWorker.loginOfContractorWorker))

router.get('/contractorWorkerLogin',(req, res) =>
{
    res.render('authViews/contractorWorkerLogin')
})


module.exports=router