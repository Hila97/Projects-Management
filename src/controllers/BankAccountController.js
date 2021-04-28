const bankAccount = require('../models/BankAccount')

const addBankAccount=(req, res)=> {
    console.log("add")
    const newBankAccount = new bankAccount(req.body)
    newBankAccount.save().then(bankAccount=>{
        console.log(req.body)
        res.json({newBankAccount})
    }).catch(err => {
        console.log(err)
    })
}
module.exports={addBankAccount}