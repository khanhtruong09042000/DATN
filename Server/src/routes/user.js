const user = require('../models/user')
const Router = require('express').Router()
const CryptoJS = require('crypto-js')

//UPDATE USER
Router.put('/:id', async (req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString()
    }

    try {
        const updateUser = await user.findByIdAndUpdate(
            req.params.id,
            { 
                $set: req.body
            },
            { new : true }
        )
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json(error) 
    }
})

//DELETE USER
Router.delete('/:id', async (req,res)=>{
    try {
        await user.findByIdAndDelete(req.params.id)
        res.status(200).json('Delete user!')
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET USER
Router.get('/find/:id', async (req,res)=>{
    try {
        const find_user = await user.findById(req.params.id)
        res.status(200).json(find_user)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET_USERS
Router.get('/find',async (req,res)=>{
    try {
        const users = await user.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET_USER_GIAOVU
Router.get('/finds/GV',async (req,res)=>{
    try {
        const users = await user.find({level: "Giáo vụ"})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error) 
    }
}) 

//GET_USER_GIAOVIEN
Router.get('/finds/GV1',async (req,res)=>{
    try {
        const users = await user.find({level: "Giáo viên"})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error) 
    }
}) 

//GET_USER_SINHVIEN
Router.get('/finds/SV',async (req,res)=>{
    try {
        const users = await user.find({level: "Sinh viên"})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error) 
    }
}) 

//UPDATE_STATUS
Router.put('/id/status',async (req,res)=>{
    try {
        const users = await user.updateOne({
            username: req.body.username
        },
            { 
                $set: {
                    status: req.body.status
                }
            },
            { new : true }
        )
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error) 
    }
}) 

module.exports = Router