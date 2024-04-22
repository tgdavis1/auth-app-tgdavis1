const express = require('express')
const bcrypt  = require('bcrypt')
const User = require('../models/user')
const authenticateUser=require('../middleware/authenticateuser')

const router = express.Router()

router.post('/register',async (req,res)=>{
    try{
        const user_name = req.body.txtUsername
        const password = await bcrypt.hash(req.body.txtPassword,8)
        const user = new User ({user_name:user_name, password:password})
        await user.save()
        req.session.user_id = user._id
        res.redirect('/dashboard')
    }catch(e){
        res.redirect('/')
    }
   
    
})

router.post('/login',async (req,res)=>{

    const user = await User.findOne({user_name:req.body.txtUsername})
    if(!user){
        console.log("User not found")
        return res.redirect('/?auth=fail')
    }
    
    const isMatch = await bcrypt.compare(req.body.txtPassword,user.password)
    if(!isMatch){
        console.log("Passwords don't match")
        return res.redirect('/?auth=fail')
    }
    req.session.user_id = user._id

    return res.redirect('/dashboard')
      
    

})

router.get('/dashboard',authenticateUser,async (req,res)=>{
   
    return res.render('dashboard',{user:req.user})
})

router.get('/topsecret',authenticateUser,async (req,res)=>{
   
    return res.send({id: req.user._id})
})

router.post('/logout',authenticateUser,(req,res)=>{
    req.session.destroy(()=>{
        console.log("User logged out.. session destroyed")
        return res.redirect('/')
    })
})


module.exports = router