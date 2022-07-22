const  route=require('express').Router()
const user=require('../model/user')

route.get('/signup',(req,res)=>{
res.render('signup')
})

route.post('/signup',(req,res)=>{
    console.log(req.body)
   const new_user=new user({
    username:req.body.username,
    pin:req.body.pin,
    aadhar_number:req.body.aadhar_number,
    phoneno:req.body.phoneno,
    account_number:req.body.account_number,
    ifsc_code:req.body.ifsc_code,
    branch_name:req.body.branch_name,
    credit_card:req.body.credit_card,
    cibil_score:req.body.cibil_score,
    type:req.body.type,
    balance:req.body.balance,
    address:req.body.address,
    email:req.body.email
    })
    new_user.save()
    res.send('user added')
})
module.exports=route