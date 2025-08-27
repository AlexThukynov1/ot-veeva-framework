import fs from 'fs';
import path from 'path';

export default function getSlidesEntries() {
    const projectRoot = process.cwd();
    const slideDir = path.resolve(projectRoot, 'src', 'slides');
    const slideEntries = {};

    const files = fs.readdirSync(slideDir);
    const slideFolders = files.filter(
        file => fs.statSync(path.join(slideDir, file)).isDirectory() && file.startsWith('slide-') );

    slideFolders.forEach(folder => {
        slideEntries[folder] = path.resolve(slideDir, folder, 'index.html');
    })

    return slideEntries
}