module.exports.forgotContractorPost= async(req,res)=>
{
    const { email } = req.body
    let randomstring = Math.random().toString(36).slice(-8)
    try {
        const user = await UsersContractor.checkEmail(email)

        await UsersContractor.findById(user._id)
            .then(user=>{

                user.password=randomstring
                user.markModified('password')
                user.save(err => console.log(err))
                console.log(user)

            })


        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'שם משתמש של המייל השולח',
                pass: 'סיסמא של מהייל'
            }
        })

        let mailOptions = {
            from: 'שם של המייל השולח',
            to: email,
            subject: 'password reset',
            text: 'מה שולחים במייל
        }


        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error)
            } else {
                console.log('Email sent: ' + info.response)
            }
        })

        res.status(200).json({ user: user._id })
        //return user
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }

}