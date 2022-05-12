import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, Firestore, updateDoc, DocumentData } from 'firebase/firestore/lite';
import { getAuth, signOut } from "firebase/auth";
import { firebaseConfig } from "../config";
import { getFunctions, httpsCallable } from 'firebase/functions';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const functions = getFunctions(app, "asia-northeast1");

export async function getInstructors(db: Firestore, callback: (Array)=>void) {
    const instructorsCol = collection(db, 'instructor');
    const instructorSnapshot = await getDocs(instructorsCol);
    const instructorList: Array<any> = instructorSnapshot.docs.map(doc => doc.data());
    callback(instructorList);
    return instructorList;
}

export async function getDocsFromDb(db: Firestore, collectionName: string, callback: (Array)=>void) {
    const Col = collection(db, collectionName);
    const Snapshot = await getDocs(Col);
    const List: Array<{id: string, data: DocumentData}> = Snapshot.docs.map(doc => {return{id: doc.id, data: doc.data()}});
    callback(List);
}

export async function getDocFromDb(db: Firestore, collectionName: string, documentName: string, callback: (Array)=>void) {
    const docRef = doc(db, collectionName, documentName);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        callback(docSnap.data());
    }
    else{
        console.log("data not exists.");
    }
}

export async function updateDocFromDb(db: Firestore, collectionName: string, documentName: string, data: {[key: string]: any}){
    await updateDoc(doc(db, collectionName, documentName), data);
}

export const auth = getAuth(app);

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

export const logout = async () =>{
    await signOut(auth);
}