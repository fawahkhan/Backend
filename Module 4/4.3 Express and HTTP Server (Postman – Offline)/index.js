const express = require ('express')

const app = express();  //yeh hr bari likhna hi likhna hai



// function sum(n){
//     let ans = 8 ;
//     for(let i=1 ; i<=n ; i++){
//         ans = ans + 1
//     }
//     return ans
// }

app.get('/',  function(req , res){
    res.send("hi there")
})

app.listen(3000);