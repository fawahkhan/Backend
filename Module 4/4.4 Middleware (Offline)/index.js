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
// function isOldEnough(age){
//     if (age>=14){
//         return true
//     }else{
//         return false
//     } 
// }


// app.get('/' , function(req,res){
//     if(isOldEnough(req.query.age)){
//        res.json({
//         msg: "You can ride the ride" 
//     }) 
//     }else{
//         res.status(411).json({
//             msg : "Sorry you are underage"
//         })
//     }
// })

// using middlewares to make the same checkpoint of age
//calling the next fn takes you to the next middleware.
function isOldEnoughMiddleware(req,res,next){
    const age = req.query.age
    if (age>=14){
        next();   //If you pass then next function takes you forward . here all the verification checks are done by the middleware and after that no hassle of any if else while riding the rides .
    }else{
        res.json({
            msg: "Sorry you are underage"
        })
    } 
}
// ab hame if else ki need nhi padegi app.get me  baar baar check nhi krna ticket ... bas middleware ek bari check krlega aur aram se fr jhula jhhulo
app.get('/ride2' , isOldEnoughMiddleware, function(req,res){
       res.json({
        msg: "You can ride the ride-2" 
    }) 
})
app.get('/ride1' ,isOldEnoughMiddleware , function(req,res){
        res.json({
            msg: "You can ride the ride-1" 
    })
})


app.listen(3000)