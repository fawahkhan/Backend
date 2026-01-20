const express = require ('express')

const app = express();  //yeh hr bari likhna hi likhna hai

// in memory hospital with 4 routes get post put and delete . 

var users = [{
    name: 'John' ,
    kidneys: [{
        healthy : false
    },{
        healthy : true
    }
    ]
}]
console.log(users[0])

app.use(express.json())


// function sum(n){
//     let ans = 8 ;
//     for(let i=1 ; i<=n ; i++){
//         ans = ans + 1
//     }
//     return ans
// }
// a popular input type is query parameter in get requests.
app.get('/',  function(req , res){
    // here we have to get the no of kidneys a user has and their health .
    const johnKidneys = users[0].kidneys
    const numberOfKidneys = johnKidneys.length
    let numberOfHealthyKidneys = 0 ;
    for (let i = 0 ; i<johnKidneys.length ; i++){
        if(johnKidneys[i].healthy){
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1 ;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

// in post requests a popular input type is sending data in the body

app.post('/',  function(req , res){
    //here we want to add a new kidney
    const isHealthy = req.body.isHealthy
    users[0].kidneys.push({
        healthy: isHealthy

    })
    res.json({
        msg: 'done!'
    })
})
app.put('/',  function(req , res){
    // here we want to replace a kidney , make it healthy 
    for(let i = 0 ; i< users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({})
})
app.delete('/',  function(req , res){
    // here we want to delete a kidney
    const newKidney = []
    for (let i= 0 ; i< users[0].kidneys.length ; i++){
        if(users[0].kidneys[i].healthy){
            newKidney.push({
                healthy : true
            })
        }
    }
    users[0].kidneys = newKidney 
    res.json({
        msg: "done"
    })
})

app.listen(3000);