const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const routes = require('./routes/index.route') 
const morgan = require('morgan')

// console.log(process.env.DB_URL)

// Database connection
function dbconnection(){
    const url = process.env.DB_URL
    mongoose.connect(url)
    .then(()=>{
        console.log("DB Connected !!!")
    })
    .catch(e=>{
        console.log(e)
        console.log("DB NOT CONNECTED")
    })
}

app.use(morgan("dev"))  // handle operation request on api ==>'console.log()'

app.use(express.json()) // parsing Data
app.use("/api",routes)

// all routes ==> get , post , patch , delete , ...

app.all("*",(req,res)=>{
    res.status(404).send({message:"invalid route !!!"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    dbconnection()
    console.log('server is running ' + PORT)
})