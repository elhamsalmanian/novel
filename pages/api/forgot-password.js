import nodemailer from "nodemailer";
import {foundDatabase} from "../../tools/backend/tools";

export default async function handler (req , res){
    if(req.method === "POST"){

       await foundDatabase()
           .then(result =>{
               new Promise((resolve , reject)=>{
                   let length = result.users.length;
                   result.users.forEach((item , i) =>{

                       if(item.email === req.body.email){
                           resolve();
                       }else{
                           if(length === i + 1){
                                reject("User Not Found")
                           }
                       }
                   })

               }).then(() =>{
                   const transporter = nodemailer.createTransport({
                       host: 'smtp.gmail.com',
                       port: 465,
                       secure: true,
                       auth: {
                           user: "bebinkarado@gmail.com",
                           pass: '1030eli4483poori'
                       }
                   });
                   const mailOptions = {
                       from: 'bebinkarado@gmail.com', // sender address
                       to: 'elham.salmanian@gmail.com', // list of receivers
                       subject: 'HELOOOOOOOOOOOOOOO', // Subject line
                       html: '<p>Your html here</p>'// plain text body
                   };
                   transporter.sendMail(mailOptions, function (err, info) {
                       if(err){
                           console.log(err);
                       }
                       else {
                           console.log(info);
                       }
                   });
                   res.status(200).send({ success : true , message : "please check your email" })
               }).catch(err =>{
                   console.log(err);
                   res.send({ success : false , message : err })
               })

           }).catch(err =>{
               console.log(err)
           })

    }
}


