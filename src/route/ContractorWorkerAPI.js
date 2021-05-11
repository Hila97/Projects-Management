const router = require('express').Router()
const contractorWorker = require('../controllers/ContractorWorkerController')

router.get('/displayProfile',contractorWorker.displayEditProfile)

router.put('/editProfile',contractorWorker.editProfile)
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

router.get('/editContractorWorker',(req,res)=>{
    res.render('editProfileContractor')
})
module.exports=router