import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config";
import { getFunctions, httpsCallable } from 'firebase/functions';

const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app, "asia-northeast1");

export const sendForm =  async (form: {[key: string]: string}, callback: ()=>void=()=>{}) =>{
    try{
        const sendMail = httpsCallable(functions, "sendMail");
        await sendMail(form);
    
        callback();
        return {
            status: true,
        };
    }
    catch (_e){
        return {
            status: false,
            message: _e
        }
    } 
}
