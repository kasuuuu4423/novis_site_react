import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as admin from "firebase-admin";
import { adminMailBodyContact, adminMailBodyApply } from "./lib/mailBody";

admin.initializeApp();
const db = admin.firestore();

export const sendMail = functions
.region("asia-northeast1")
.https.onCall(async (data, context) => {
    const { cat, name, email, content, age, instructor, plan } = data;
    if (!email) {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "email is required"
        );
    }

    const adminMailContactData = {
        to: process.env.ADMINEMAIL,
        message: {
            subject: "Novis 問い合わせ",
            text: adminMailBodyContact({ name, email, content }),
        },
    };

    const adminMailApplyData = {
        to: process.env.ADMINEMAIL,
        message: {
            subject: "Novis 申し込み",
            text: adminMailBodyApply({ name, email, age, instructor, plan }),
        },
    };

    if (cat == "contact"){
        await db.collection("mail").add(adminMailContactData);
    }
    else if (cat == "apply"){
        await db.collection("mail").add(adminMailApplyData);
    }
});