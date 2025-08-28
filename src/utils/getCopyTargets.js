import path from 'path';
import fs from 'fs';

// Функція для динамічного створення масиву цілей для копіювання
 export default function getCopyTargets() {
  const slidesDir = path.resolve(__dirname, '..', 'slides');
  const targets = [];

  const files = fs.readdirSync(slidesDir);
  const slideFolders = files.filter(file =>
    fs.statSync(path.join(slidesDir, file)).isDirectory() && file.startsWith('slide-')
  );

  slideFolders.forEach(folder => {
    targets.push({
      src: `src/slides/${folder}/media/*`,
      dest: `src/slides/${folder}/media`,
    });
  });

  return targets;
}