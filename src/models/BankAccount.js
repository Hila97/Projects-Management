const mongoose = require ('mongoose');
const schema= mongoose.Schema;
const BankAccountSchema = new schema(
    {
        bankName: String,
        branch: Number,
        accountNumber: Number

    });



const BankAccount  = mongoose.model('BankAccount',BankAccountSchema)
module.exports = BankAccount