import React , {useReducer} from "react";
import Context from "./context";
import { RegistryReducer } from "./reducer/registry.reducer"

const INITIAL_STATE = {
    fetching : false,
    loading : false,
    error : { active : false , message : "" },
    user : { username : "" , fullName : "" , email : "" , id : "" , avatar : null },
}

export default function AppContext ({ children }){
    const [state , dispatch] = useReducer(RegistryReducer , INITIAL_STATE);
    return (
        <Context.Provider value={{
            dispatch,
            ...state
        }}>
            { children }
        </Context.Provider>
    )
}