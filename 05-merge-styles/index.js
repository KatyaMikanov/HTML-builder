const fs = require('fs');
const path = require('path');

const url = path.join(__dirname, 'styles');

let writeableStream = fs.createWriteStream("05-merge-styles/project-dist/bundle.css");

fs.readdir(url, (err, files) => {

    files.forEach((file) => {
        if (err) {
            console.error(err);
        }
        
        const originalFilePath = path.join(url, file);

        fs.stat(originalFilePath, (err, el) => {
            if (err) {
                console.log(err);
            } else if (el.isFile() && path.basename(file, '').split('.')[1] === 'css') {
                fs.createReadStream(originalFilePath).pipe(writeableStream);
            }
        });
    });
});
