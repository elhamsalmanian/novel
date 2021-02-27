import {foundDatabase} from "../../tools/backend/tools";
import fs from "fs";
import {USERS_DATA_DIR} from "../../global";
export default async function handler(req, res) {
  if (req.method === "POST") {
    await foundDatabase()
      .then(result => {
        console.log(result);
        const foundedUser = result.users.find(item => item.email === req.body.email);
        let allUsers = result.users.filter(item => item.email !== req.body.email);
        if (foundedUser.password === req.body.old_password) {
          const updatedData = {
            ...foundedUser,
            password: req.body.new_password,
          };
          allUsers = {
            users: [...allUsers, updatedData],
          };

          let finalData = Buffer.from(JSON.stringify(allUsers));
          fs.writeFile(`${USERS_DATA_DIR}/user.json`, finalData, {encoding: "utf16le"}, err => {
            if (err) {
              console.log(err);
              res.send({success: false, message: "error"});
            }
            res.send({success: true, message: "password changed"});
          });
        } else {
          res.send({success: false, message: "old password is wrong"});
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
