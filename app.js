const express = require('express')
const fs= require('fs')
const path = require('path')
const mongoose = require('mongoose')
const bcrypt  = require('bcrypt')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const dotenv=require('dotenv')

dotenv.config()

const User = require('./models/user') // import the User model from models.
const userRouter = require('./routes/user') // import the /user route handlers from routes.


const app = express()

app.listen(process.env.Port)

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

const url = process.env.MONGOURL


app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.use(session({
    secret:process.env.SESSIONKEY,
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({mongoUrl:url})

}))

app.use(userRouter) // This will mount the routes in userRouter into app

function greet(req,res,next){
    console.log("I received a request!")
    next()
}


mongoose.connect(url,(err)=>{
    if(err)
        console.log("Error connecting to DB..")
    else
        console.log("Successfully connected to DB..")
})




app.get('/',(req,res)=>{
    
   res.render('index')
    
})






