var express = require('express')
var cors = require('cors')
const fetch = require('node-fetch');


var bodyParser = require('body-parser')

const CLIENT_ID = "80ded0d522b2f5e7b6ec"
const CLIENT_SECRET = "b3dbb3699955172d3f57fc65f9913990aec630c5"


var app = express()

app.use(cors())
app.use(bodyParser.json())

//code
app.get('/getAccessToken',async(req,res)=>{
 /*    const params = "?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&code="+req.query.code;
    console.log(params)
    const url = `https://github.com/login/oauth/access_token${params}`
    const options = {
        "method":"POST",
        "body":req.body,
        "headers":{
            "Content-Type":"application/json",
        }
    };
    const response =  fetch(url,options)
    console.log(fetch)
    .then(res => res.json())
    .catch(e=>{
        console.error({
            "message":"oh no!!",
            error:e
        })
    })
    console.log("response:" + response) */
  const params = "?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&code="+req.query.code;
    console.log(params)

 await fetch(`https://github.com/login/oauth/access_token${params}`, {
    method: 'POST',
    headers:{
        "Accept":"application/json"
    }
}).then((response) =>{
    return response.json()
}).then((data) => {
    res.json(data)
})
  .catch(err => console.log(err));
})


//getuserdata

app.get('/getData',async (req,res)=>{
    req.get("Authorization") //Beares Acess token
    await fetch("https://api.github.com/user",{
        method:"GET",
        headers:{
            "Authorization":req.get("Authorization")
        }
    }).then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data)
        res.json(data)
    })
})

app.listen(4000,(req,res)=>{
    console.log("im listening")
})

