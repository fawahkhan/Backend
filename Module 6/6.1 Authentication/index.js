// we will be studying about authentication using JWTs and web tokens
const express = require ("express")
const jwt = require ("jsonwebtoken")
const JWT_SECRET = "fawahkhanisahuman"

const app = express()
app.use(express.json())
//now we have to create an inmemory variable to store users
const users = []


//function to generate random token .... now we are using jwt so no need to generate our own token. thus removing this function.
// function generateToken(){
//     let options = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
//     'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
//     '0','1','2','3','4','5','6','7','8','9']
//     let token = ''
//     for(let i=0; i<32; i++){
//         token += options[Math.floor(Math.random() * options.length)]
//     }
//     return token
// }

// signup
app.post("/signup" , function(req,res){
    //we want to add new users to the in memory variable that we made 
    const username = req.body.username
    const password = req.body.password

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
    const username = req.body.username
    const password = req.body.password

    const foundUser = users.find((u) => {
        if (u.username === username && u.password === password){
            return true
        }else{
            return false
        }    
    })
    if (foundUser){
        const token = jwt.sign({
            username: username
        }, JWT_SECRET) //convert the username into a jwt using JWT_SECRET ;
            //NOW WE DONT HAVE TO STORE TOKEN IN MEMORY SINCE WE ARE USING JWTs
        // foundUser.token = token   //to store the token in the array
        res.json({
            token : token 
        })
    }else{
        res.status(403).send({
            msg : "invalid username or password"
        })
    }
})

// now i want that when a user logs in, then the app should show user details when it recognises you by your token
// token bhejna padega taki server apko recognise krpaye
app.get("/me" , function(req,res){
    const token = req.headers.token  //check the token from the headers //now we will get it from jwt
    const decodedInformation = jwt.verify(token , JWT_SECRET) //    {username: "fawah@gmail.com"}
    const username = decodedInformation.username
    
    let foundUser = null ;

    for (let i = 0 ; i< users.length ; i++){
        if(users[i].username == username){
            foundUser = users[i]
        }
    }
    if(foundUser){
        res.json({
            username: foundUser.username ,
            password: foundUser.password
        })
        
    }else{
        res.json({
            msg: "token invalid"
        })
    }
})



//listening on port 3000
app.listen(3000)