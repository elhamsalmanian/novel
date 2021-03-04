import jwt from "jsonwebtoken";
import {foundDatabase} from "../../tools/backend/tools";
import {USERS_DATA_DIR} from "../../global";
import fs from "fs";

export default async function handler (req  ,res){
    if(req.method === "POST"){

         foundDatabase()
             .then(result =>{
                 if(result){
                     new Promise((resolve , reject)=>{
                        result.users.forEach((item , i) =>{
                       
                            if(item.email !== req.body.email){
   
                               let allUsers = result.users;
                                 const newUser = {
                                   ...req.body
                                 };
                                 allUsers = {
                                   users: [...allUsers,newUser ],
                                 };
                       
                                 let finalData = Buffer.from(JSON.stringify(allUsers));
                                 fs.writeFile(`${USERS_DATA_DIR}/user.json`, finalData, {encoding: "utf16le"}, err => {
                                   if (err) {
                                     console.log(err);
                                     reject("error")
                                   }
                                   resolve({ info : {...req.body} })
                                 });
                               }
                               
                        })
                   
                    
             }).then(response => {
                res.send({success : true ,message: "user signed up" , info : response.info  })
             })
             .catch(err =>{
             console.log(err);
             res.status(500).send({ message: " data not found"  });
         })
        }})
    }else{
        res.status(401).send({ message : "method not allowed" });
    }

}
