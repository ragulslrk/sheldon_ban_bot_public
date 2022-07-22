const route =require("express").Router()
const user =require('../model/user')
const nodemailer=require("nodemailer")

const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")


const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.hbs"), "utf8")

let transporter = {
    service: 'hotmail',
    auth: {
    user:process.env.user ,
    pass:process.env.pass,
    },
};


const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)
//generate OTP
function generateOTP() {
          
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

route.post('/verify_user',(req,res)=>{
    const ac_num=parseInt(req.body.account_number)
        user.findOne({username:req.body.username,account_number:ac_num})
        .then((result)=>{
            if(result === null)
            {
                res.sendStatus(404)
            }
            else{
                res.sendStatus(200)
            }   
        })
        .catch(err=>{
           console.log(err)
        })
})

route.post("/send_mail",(req,res)=>{
    const ac_num=parseInt(req.body.account_number)
    console.log(req.body)
    user.findOne({username:req.body.username,account_number:ac_num})
    .then((result)=>{
        const otp=generateOTP()

        result.otp_change_pin=otp
       console.log(otp)
        const htmlToSend = template({user:result.username,otp:otp})
        const mailOptions = {
         from:'sheldon.chatbot@hotmail.com',
        to:result.email,
        subject: `OTP for Change Pin(Sheldon Bank)`,
        html: htmlToSend
            }
          
            
          
          smtpTransport.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('hotmail')
              console.log(err);
              res.sendStatus(400)
            } else {
                result.save()
                res.send('mail sent')
               
            }
          });

    })
    .catch(err=>{
        console.log(err)
    })

   
})

route.post('/check_otp',(req,res)=>{
    user.findOne({username:req.body.username})
    .then((result)=>{
            if(result.otp_change_pin === req.body.otp)
            {   console.log('in otp')
                    res.sendStatus(200)            
            }
            else{
                
                res.sendStatus(400)
            }
    })
    .catch(err=>{
        console.log(err)
    })
})

route.post('/update_pin',(req,res)=>{
user.findOne({username:req.body.username})
.then((result)=>{
    const new_pin =parseInt(req.body.pin)
    if(result.pin === new_pin)
    {
        res.sendStatus(401)
    }
    else{
        result.pin=new_pin
        result.otp_change_pin='not'
        result.save()
        res.sendStatus(200)
    }


})
.catch(err=>{
    console.log(err)
})
})
module.exports=route