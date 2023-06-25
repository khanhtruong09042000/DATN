const Router = require('express').Router()
const User = require('../models/user')
const CryptoJS = require('crypto-js')

//REGISTER
Router.post('/register', async (req,res)=>{
    const new_User = new User({
        username: req.body.username,
        email: req.body.email,
        level: req.body.level,
        MSSV: req.body.MSSV,
        Img: req.body.Img, 
        password: CryptoJS.AES.encrypt( 
            req.body.password, 
            process.env.PASS_SEC
        ).toString()
    })

    try {
        const saveUser = await new_User.save()
        res.status(201).json(saveUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//LOGIN
Router.post('/login', async (req,res)=>{
    try {
        const user = await User.findOne(
            {
                username: req.body.username,
                level: req.body.level
            }
        )
 
        !user && res.status(401).json("Lỗi user!")
        
        const password1 = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC 
        ) 

        const password2 = password1.toString(CryptoJS.enc.Utf8)

        const inputPassword = req.body.password

        password2 != inputPassword &&  res.status(401).json("Sai Password");

        // res.status(200).json(user)
        const { password, ...others } = user._doc;   
        res.status(200).json({...others});

    } catch (error) {   
        res.status(500).json(error) 
    }
})

module.exports = Router