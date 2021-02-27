import axios from "axios";
import * as global from "../global"
const apiRequest = axios.create();

export function Request(method = "GET" , url ="", data , headers = global.HEADER_JSON) {
    return apiRequest({
        method,
        url,
        data,
        headers
    })
}