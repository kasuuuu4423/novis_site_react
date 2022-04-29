import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, Firestore, updateDoc } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../config";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

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
    const List: Array<any> = Snapshot.docs.map(doc => doc.data());
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