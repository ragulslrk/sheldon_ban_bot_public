const route=require('express').Router()
const withdraw =require('../model/withdraw')
const transaction=require('../model/transaction')


route.post('/withdraw_trans',(req,res)=>{

    withdraw.find({username:req.body.username}).sort({"date":-1}).limit(5)
    .then((result)=>{
        console.log(result.length)
        res.send(result)
    })
})


route.post('/deposit_trans',(req,res)=>{
    transaction.find({$or:[
        {$and:[{"from":req.body.username},{"action":"sended"}]},
        {$and:[{"to":req.body.username},{"action":"received"}]},
        {$and:[{"from":req.body.username},{"to":req.body.username},{"type":"self_transfer"}]}
        ]}).sort({"date":-1}).limit(5)
    
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })

})
module.exports=route