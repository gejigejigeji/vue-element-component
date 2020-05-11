import {validateEmail} from "@/utils/validate.js";

export function valiEmail(rule, value, callback){
    if (validateEmail(value)) {
        callback()
    }else{
        callback('Format Error!');
    }
}