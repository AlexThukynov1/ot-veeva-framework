import fs from 'fs';
import path from 'path';

export default function getSlideEntries() {

  const slidesDir = path.resolve(__dirname, '..', 'slides');
  const slideEntries = {};

  const files = fs.readdirSync(slidesDir);
  const slideFolders = files.filter(file => 
    fs.statSync(path.join(slidesDir, file)).isDirectory() && file.startsWith('slide-')
  );

  slideFolders.forEach(folder => {
    slideEntries[folder] = path.join('src', 'slides', folder, 'index.html');
  });

  return slideEntries;
}