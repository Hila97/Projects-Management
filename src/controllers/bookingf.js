
const Booking=require('../models/bookingf')


const booking = async (req, res)=> {
    try {
      // console.log(req.body)
      const newBooking = new Booking(req.body)
      console.log(newBooking)
      await newBooking.save()
      res.send("Saved new booking!")

    } catch (error) {
      console.log(error)
      return res.status(500).json({ errors: [{ msg: "Server error" }] })
    }
    // console.log("add")
    // const newBooking = new Booking(req.body)
    // newBooking.then(Booking=>{
    //     console.log(req.body)
    //     res.json({newBooking})
    // }).catch(err => {
    //     console.log(err)
    // })


}

module.exports={booking}
