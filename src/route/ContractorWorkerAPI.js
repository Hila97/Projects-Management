const router = require('express').Router()
const contractorWorker = require('../controllers/ContractorWorkerController')

router.post('/addContractor',contractorWorker.addContractor)
router.get('/findWorkerByRating/:rating',(contractorWorker.findWorkerByRating))
router.get('/findContractorByID/:ID',contractorWorker.findContractorByID)
router.post('/editProfile',(contractorWorker.editProfile))
router.get('/findAllContractor',(contractorWorker.findAllContractor))
//router.get('/findWorkerByHourlyWage/:min&max',contractorWorker.findWorkerByHourlyWage)

router.post('/loginOfContractorWorker',(contractorWorker.loginOfContractorWorker))


module.exports=router