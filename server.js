const express=require('express')
const mongoose=require("mongoose")  
const bcrypt=require("bcryptjs")
const passport=require("passport")
const localstrategy=require("passport-local").Strategy
const  session=require("express-session")
const MongoStore=require("connect-mongo")
const  flash=require("connect-flash")
const cors = require('cors');
const bodyParser = require('body-parser');
const app=express()
require("dotenv").config()
app.use(express.urlencoded({extended:true}));   
app.use(flash())
app.set("view engine","ejs")
app.use(express.static('views'))
app.use(express.static('assets'))
app.use(cors());
app.use(bodyParser.json());
const path = require("path")


mongoose.connect( process.env.db,{useNewUrlParser: true,useUnifiedTopology: true})
    .then((res)=>{
        app.listen(process.env.PORT ||3232,()=>{
        console.log("listening chola bank")
    })
  
    console.log("success chola bank")})
    .catch((err)=>{console.log(err)})

//route  to signup  
const signup=require('./controller/signup')
app.use(signup)


//route to  login
const login=require('./controller/login')
app.use(login)


//route to money transfer
const transfer=require('./controller/money_transfer')
app.use(transfer)

//route to withdraw
const withdraw_money=require('./controller/withdraw')
app.use(withdraw_money)

//route to  change  pin 
const change_pin=require('./controller/change_pin')
app.use(change_pin)

//route to block and unblock cc
const  block=require('./controller/block_card')
app.use(block)

//route to card bill 

const bill=require('./controller/card_bill')
app.use(bill)

// route  to view transaction

const view_trans=require('./controller/view_transaction')
app.use(view_trans)

//route  to ge t balance 
const  get_balance=require('./controller/get_balance')
app.use(get_balance)

// //route  to  node  mailer
// const mail=require('./controller/node_mailer')
// app.use(mail)

app.get('/',(req,res)=>{
    res.send('This is sheldon bank bot api website ')
})