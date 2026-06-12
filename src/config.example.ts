// Firebase コンソール > プロジェクトの設定 > マイアプリ から値を取得して設定してください。
//
// ローカルセットアップ:
//   cp src/config.example.ts src/config.ts
//
// CI では FIREBASE_API_KEY などの環境変数から自動生成されます（scripts/ensure-config.js）。

export const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};
