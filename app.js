require('dotenv').config()
const express=require('express')
const path=require('path')
const cloudinary = require("cloudinary").v2
const databaseConnection = require('./app/config/empconfig.js')

// console.log(path);

//cloudinary
//console.log("apikey: ", process.env.CLOUDINARY_API_KEY, "\napisecret: ", process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



const app=express();

//database connection
databaseConnection()

app.set('view engine','ejs')
app.set('views','views')

//define json
app.use(express.json()) //to get data 
app.use(express.urlencoded({extended:true}))   //this will be used  in case of ejs

//static files
//app.use(express.static(path.join(__dirname,'public'))); 
app.use('/uploads',express.static(path.join(__dirname,'uploads'))) //u can use any 1 way
//app.use('/uploads',express.static('uploads')); 

const empejsroute = require("./app/routes/emproutes.js")
app.use('/', empejsroute)




const port =3004


app.listen(port,()=>{
    console.log("server is running on port",port)
})