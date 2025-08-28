const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const slidesDir = path.resolve(__dirname, 'dist', 'src', 'slides');
const zipDir = path.resolve(__dirname, 'zip_archives');

if (!fs.existsSync(zipDir)) {
  fs.mkdirSync(zipDir);
  console.log('Папка для архівів створена.');
}

// Отримуємо список папок слайдів
const slideFolders = fs.readdirSync(slidesDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && entry.name.startsWith('slide-') || entry.name === 'shared');

if (slideFolders.length === 0) {
  console.log('Не знайдено папок для архівування.');
  return;
}

function createArchive(folderName) {
  return new Promise((resolve, reject) => {
    const slidePath = path.join(slidesDir, folderName);
    const zipPath = path.join(zipDir, `${folderName}.zip`);

    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    output.on('close', () => {
      console.log(`Файл ${zipPath} створено.`);
      resolve();
    });

    archive.on('error', err => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(slidePath, false);
    archive.finalize();
  });
}

(async () => {
  console.log('Процес архівування розпочато...');
  for (const folder of slideFolders) {
    try {
      await createArchive(folder.name);
    } catch (error) {
      console.error(`Помилка під час архівування папки ${folder.name}:`, error);
    }
  }
  console.log('Процес архівування завершено.');
})();