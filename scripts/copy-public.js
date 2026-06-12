const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../public');
const targetDir = path.join(__dirname, '../dist');

function copyRecursive(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function copyPublic() {
    copyRecursive(sourceDir, targetDir);
}

if (require.main === module) {
    copyPublic();
    console.log('public/ を dist/ にコピーしました。');
}

module.exports = { copyPublic };
