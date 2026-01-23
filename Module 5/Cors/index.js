// we have to fetch this sever from html file running on different origiin 
//the frontend will be running on a different port thus without cors it wont be able to access the backend and serve the request

const express = require ("express")
const cors = require ("cors")

const app=express()
app.use(cors())   //this will allow all frontends to access our backend
 // to allow only required frontend to access our data do this
 /*
 app.use(cors({
    domains : ["https://google.com", "https://facebook.com"]      //this will allow only google and fb to access our backend
 }))
 */ 
app.use(express.json())   //middleware--> if we dont use this then req.body will be undefined

app.post("/sum", function(req,res){
    const a = parseInt(req.body.a)
    const b = parseInt(req.body.b)

    res.json({
        answer : a+b
    })
})

app.listen(3000)