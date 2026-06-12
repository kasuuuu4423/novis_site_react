const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../src/config.ts');

if (fs.existsSync(configPath)) {
    process.exit(0);
}

const {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
} = process.env;

const values = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
};

if (Object.values(values).every(Boolean)) {
    const content = `export const firebaseConfig = {
    apiKey: "${values.apiKey}",
    authDomain: "${values.authDomain}",
    projectId: "${values.projectId}",
    storageBucket: "${values.storageBucket}",
    messagingSenderId: "${values.messagingSenderId}",
    appId: "${values.appId}",
};
`;
    fs.writeFileSync(configPath, content);
    console.log('src/config.ts を環境変数から生成しました。');
    process.exit(0);
}

console.error(
    'src/config.ts が見つかりません。\n' +
    '  cp src/config.example.ts src/config.ts\n' +
    'で作成するか、FIREBASE_* 環境変数を設定してください。'
);
process.exit(1);
