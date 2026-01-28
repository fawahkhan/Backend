// this is the recap of previous class.
const express = require ("express")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "thisisme"

const app = express()
app.use(express.json())

const users = []
function logger(req, res , next){
    console.log(`${req.method} request came`)  //this tells us what kind of request came , get post etc.
    next()
}

//sending the data in html to our backend and hosting it on the same port localhost 3000
app.get("/" , function(req,res){
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/signup",logger , function(req,res){
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

app.post("/signin", logger, function(req,res){
    const username = req.body.username 
    const password = req.body.password
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
            username : foundUser.username
        } , JWT_SECRET )
        res.header
        res.json({
            token : token
        })
    }
    
    
})

//we need to create a middleware for repeated codes and logics .
function auth(req,res,next){
    const token = req.headers.token
    const decodeData = jwt.verify(token , JWT_SECRET)
    
    if(decodeData.username){
        req.username = decodeData.username
        next()
    }else{
        res.json({
            msg: "invalid credentials"
        })
    }
    
}

//added middleware named auth for the authentication.
app.get("/me",logger, auth, function(req,res){
    //const token = req.headers.token 

    //const decodeData = jwt.verify(token , JWT_SECRET)
    //const username = decodeData.username
    //if(decodeData.username){
        let foundUser = null ;

        for (let i = 0 ; i< users.length ; i++){
            if(users[i].username == req.username){
                foundUser = users[i]
            }
        }
        
        if(!foundUser){
            res.json({
                msg: "User not found"
            })
            return
        }else{
            // we can send the user data
            res.json({
                username : foundUser.username ,
                password : foundUser.password
            })
        }
    //}
    
    
})


app.listen(3000)