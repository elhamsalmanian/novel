import { createContext } from "react";

const context = createContext({
    fetching : false,
    loading : false,
    error : { active : false , message : "" },
    user : { username : "" , fullName : "" , email : "" , id : "" , avatar : null },
});

export default context