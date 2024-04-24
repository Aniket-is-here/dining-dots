const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname + "/public")))

// app.get('/',(request,result) => {
//     return result.json('backend')
// })

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
  });



app.post('/signin',(request,response) => {
    const db = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'dining-dots'
    })
    
    const sql = "SELECT * FROM users WHERE partner_id = ? AND password = ?"

    db.query(sql,[ request.body.id, request.body.password],(err,data)=>{
        if(err){
            return response.json(err);}

        if(data.length > 0){
            return response.json(data[0].username);
        }else{
            return response.json("No");
        }
    }) 
})
app.listen(process.env.PORT || 8081,()=>{
    console.log('Backend Running');
})

