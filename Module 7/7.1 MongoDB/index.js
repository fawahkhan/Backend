const express = require('express');
const {UserModel , TodoModel} = require ("./db")
const jwt = require ('jsonwebtoken');
const  mongoose = require('mongoose');
const JWT_SECRET = "fawah123 "  //used for signin and verification purpose

//connect the mongo db data base
mongoose.connect("mongodb+srv://fawahkhan:Fawah123@cluster0.qxcpijc.mongodb.net/todo-app-database")
 
const app = express();
app.use(express.json()) // sincce we are parsing the json body


app.post('/signup', async function(req, res){
    const email = req.body.email 
    const password = req.body.password 
    const name = req.body.name
    
    await UserModel.create({  //to insert
        password: password,
        name: name,
        email: email
    })

    res.json({
        msg: "You are logged in"
    })
});

// all database calls have to be async 
app.post('/signin', async function(req, res){
    //we have to check that is there a user with the given username and password.
    //we have to read the details that the user gave me
     
    const email = req.body.email
    const password = req.body.password

    const user = await UserModel.findOne({ //this function reads the details provided bby the user
        email: email,
        password: password
    })
    console.log (user)
     //if user exists then we hv to send them a token which would be used further for future authenticated requests.
    if(user){
        const token = jwt.sign({
            //what json data do we want to store here. earlier we stored username.
            //but this time if we are aving the id then we will get to know that who is the user
            id: user._id.toString()  //since user._id is an object and need to be converted to a string .
        }, JWT_SECRET)
        res.json({
            token,
        })
    }else{
        res.status(403).json({
            msg: "invalid credentials"
        })
    }
}); 

//to create a todo
app.post('/todo', auth, function(req, res){
    const userId = req.userId ;
    const title = req.body.title;
    TodoModel.create({
        title,
        userId
    })

    res.json({
        userId: userId
    })
});

app.get('/todos', auth, async function(req, res){
    const userId = req.userId ;
    const todos = await TodoModel.find({
        userId : userId
    })
    res.json({
        todos
    })
});

//adding middleware for authorization
function auth(req, res, next){
    const token = req.headers.token // headers me check kro jo token aya

    const  decodedData = jwt.verify(token, JWT_SECRET) //NOW VERIFY THAT IS THE GIVEN TOKEN TRUE FOR THE GIVEN JWTSECRET KEY.

    if(decodedData){
        req.userId = decodedData.id 
        next()
    }else{
        res.status(403).json({
            msg : "invalid credentials "
        })
    }
}

app.listen(3000)