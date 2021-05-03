const router=require('express').Router()
const contractorWorker=require('../controllers/ContractorWorkerController')

router.post('/addContractor',contractorWorker.addContractor)
router.get('/findWorkerByRating/:rating',(contractorWorker.findWorkerByRating))
router.get('/findWorkerByHourlyWage/:min/:max',contractorWorker.findWorkerByHourlyWage)
router.get('/findContractorByFieldOfEmployment/:fieldOfEmployment',contractorWorker.findContractorByFieldOfEmployment)


module.exports=router