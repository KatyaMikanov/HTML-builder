const fs = require('fs');
const path = require('path');

const urlDestination = path.join(__dirname, 'files-copy');
const urlSource = path.join(__dirname, 'files');

const fsPromises = fs.promises;
fsPromises.mkdir(urlDestination, { recursive: true }).then(function () {
    console.log('Каталог успешно создан');
}).catch(function () {
    console.log('Не удалось создать каталог');
});

fs.readdir(urlSource, (err, files) => {

    files.forEach((file) => {
        if (err) {
            console.error(err);
        }
        
        const originalFilePath = path.join(__dirname, 'files', file)

        fs.stat(originalFilePath, (err, el) => {
            if (err) {
                console.log(err);
            }
            if (el.isFile()) {
                const writePath = path.join(urlDestination, file);
                fs.promises.copyFile(originalFilePath, writePath)
            } else if (el.isDirectory()) {
                fs.promises.mkdir(path.join(urlDestination, file))
                copyDirectory(path.join(urlSource, file), path.join(urlDestination, file))
            }
        });
    });
});
