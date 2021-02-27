import fs from "fs"
import {foundDatabase} from "../../tools/backend/tools";
import {USERS_DATA_DIR} from "../../global";


export default async function handler (req , res){
    if(req.method === "PUT"){
        await foundDatabase()
            .then(result =>{
                   const foundedUser = result.users.find(item => item.email === req.body.email );
                   let allUsers = result.users.filter(item => item.email !== req.body.email);
                   const updatedData = {
                       ...foundedUser,
                       password: req.body.password
                   }
                   allUsers = {
                       "users" : [
                           ...allUsers , updatedData
                       ]
                   };

                let finalData = Buffer.from(JSON.stringify(allUsers));
                fs.writeFile(`${ USERS_DATA_DIR }/user.json` , finalData , { encoding : "utf16le" } , (err)=>{
                    if(err){
                        console.log(err);
                        res.send({ success : false, message : "error" })
                    }
                    res.send({ success: true , message : "password changed" })
                })
            })
    }else{
        res.status(405).end();
    }
}