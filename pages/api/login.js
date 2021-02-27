import jwt from "jsonwebtoken";
import {foundDatabase} from "../../tools/backend/tools";

export default async function handler (req  ,res){
    if(req.method === "POST"){

         foundDatabase()
             .then(result =>{
                 if(result){
                     new Promise((resolve , reject)=>{

                     result.users.forEach((item , i) =>{
                         console.log(item.email , " :: ", req.body.email)
                         console.log(typeof item.email , " :: ",typeof req.body.email)
                         console.log(item.email === req.body.email)
                         if(item.email === req.body.email){
                             if(item.password === req.body.password){
                                 const hash = jwt.sign(req.body , "novella" , {algorithm : "HS256"});
                                 resolve({hash , info : { name : item.name } })
                             }else{
                                 reject("email or password is wrong")
                             }
                         }else{
                             if(result.length === i + 1){
                             reject("user not found")
                             }
                         }
                     })
                     }).then(response => {
                         res.send({success : true ,message: "user logged" , info : response.info , bearer : response.hash  });
                     }).catch(err =>{
                         res.send({success : false , message : err })
                     })

                 }else{
                     res.send({ message: "not found"  });
                 }
             }).catch(err =>{
             console.log(err);
             res.status(500).send({ message: " data not found"  });
         })
    }else{
        res.status(401).send({ message : "method not allowed" });
    }
}
