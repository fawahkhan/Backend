// this is the recap of previous class.
const express = require ("express")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "thisisme"

const app = express()
app.use(express.json())

const users = []

app.post("/signup",function(req,res){
    const username = req.body.username 
    const password = req.body.password
    
    users.push({
        username , 
        password
    })
    
    res.json({
        msg : "User is created"
    })
})

app.post("/signin",function(req,res){
    let foundUser = null ;

    for (let i = 0 ; i< users.length ; i++){
        if(users[i].username == username){
            foundUser = users[i]
        }
    }
    if(!foundUser){
        res.json({
            msg : "credentials incorrect"
        })
        return
    }else{
        const token = jwt.sign({
            username
        } , JWT_SECRET )
        res.json({
            token : token
        })
    }
    
    
})

app.get("/me",function(req,res){
    
    
    
    res.json({
        msg : "User is"
    })
})


app.listen(3000)