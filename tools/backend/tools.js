import fs from "fs";
import path from "path"
import {USERS_DATA_DIR} from "../../global";


export const foundDatabase = async ()=>{

    return await new Promise((resolve , reject)=>{

     fs.readFile(path.resolve(USERS_DATA_DIR , "user.json") , (err , data)=>{
        if(err) {
            console.log(err);
            return reject(err);
        }
        const file = data.toString("utf-8");
        if(file){
            resolve(JSON.parse(file));
        }else {
            reject(null);
        }
    });
    })
}