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
            id: user._id 
        })
        res.json({

        })
    }else{
        res.status(403).json({
            msg: "invalid credentials"
        })
    }
}); 

//to create a todo
app.post('/todo', function(req, res){

});

app.get('/todos', function(req, res){

});

app.listen(3000)