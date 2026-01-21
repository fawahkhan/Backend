// middlewares are the functions thaat have an access to the request and response object and the next middleware function in the application's request response cycle
//they are basically the check points to see if everything is going right or not . eg. ticket checker check the ticket, if no ticket he kicks you out

// main functions of middlewares 
// Execute any code
// Make changes to the request and response objects
// End the request response cycle
// Call the next middleware function in the stack 

// There can be multiple reasons for a middleware to end the request response cycle thus we should make the logics separately for different checkpoints so that they can be reused too if needed.

const express = require ('express')

const app = express()

//fn that returns a boolean if your age is 14 or not
function isOldEnough(age){
    if (age>=14){
        return true
    }else{
        return false
    } 
}

app.get('/' , function(req,res){
    if(isOldEnough(req.query.age)){
       res.json({
        msg: "You can ride the ride" 
    }) 
    }else{
        res.status(411).json({
            msg : "Sorry you are underage"
        })
    }
})

app.listen(3000)