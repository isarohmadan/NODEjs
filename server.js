const express = require('express');
const sql = require('mysql');
const  bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine' , 'ejs')
app.set('views','view')

const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "data_permata"
})
db.connect((err)=>{
    if (err) throw err
    app.get('/',(req,res) =>{
    const sql = "SELECT * FROM `email_user`"
    db.query(sql,(err,result)=>{    
    const userku = JSON.parse(JSON.stringify(result));
        res.render('home',{
            users: userku,
            title: 'BELAJAR MEMBUAT WEB NODE JS',
        })
    })
    })
    app.post('/tambah',(req,res)=> {
        const masuk = `INSERT INTO email_user(email) VALUES ('${req.body.email}')`;
        db.query(masuk,(err,response)=>{
            if (err) {
                return err;
            }else{
                res.redirect('/')
            }
        })
    })
})


app.listen('8000',()=> {
    console.log('server ready!')
})