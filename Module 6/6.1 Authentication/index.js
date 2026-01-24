// we will be studying about authentication using JWTs and web tokens
const express = require ("express")

const app = express()
app.use(express.json())
//now we have to create an inmemory variable to store users
const users = []


//function to generate random token
function generateToken(){
    let options = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    '0','1','2','3','4','5','6','7','8','9']
    let token = ''
    for(let i=0; i<32; i++){
        token += options[Math.floor(Math.random() * options.length)]
    }
    return token
}

// signup
app.post("/signup" , function(req,res){
    //we want to add new users to the in memory variable that we made 
    const username = req.query.username
    const password = req.query.password

    users.push({
        username,
        password
    })

    res.json({
        msg: "Youre signed in"
    })
})

// signin
app.post("/signin" , function(req,res){
    const username = req.query.username
    const password = req.query.password

    const foundUser = users.find((u) => {
        if (u.username === username && u.password === password){
            return true
        }else{
            return false
        }    
    })
    if (foundUser){
        const token = generateToken() ;
        foundUser.token = token   //to store the token in the array
        res.json({
            token : token 
        })
    }else{
        res.status(403).send({
            msg : "invalid username or password"
        })
    }
})



//listening on port 3000
app.listen(3000)