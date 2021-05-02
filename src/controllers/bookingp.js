/*const express = require('express')
const router = express.Router()
const User = require("../../models/User")

router.post('/', async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select('-password')
    // res.json(user)
    console.log(req.body)
    res.status(200).send('yyyaass')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})
module.exports = router
*/

const bookingp=require('../models/bookingp')

const addbookingp=(req, res)=> {
    console.log("add")
    const newbookingp = new bookingp(req.body)
    newbookingp.save().then(bookingp=>
    {
        console.log(req.body)
        res.json({newbookingp})
    }).catch(err =>
    {
        console.log(err)
    })
}
module.exports={addbookingp}

