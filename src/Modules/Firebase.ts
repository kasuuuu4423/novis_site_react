import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';

export async function getInstructors(db: Firestore, callback: (Array)=>void) {
    const instructorsCol = collection(db, 'instructor');
    const instructorSnapshot = await getDocs(instructorsCol);
    const instructorList: Array<any> = instructorSnapshot.docs.map(doc => doc.data());
    callback(instructorList);
    return instructorList;
}