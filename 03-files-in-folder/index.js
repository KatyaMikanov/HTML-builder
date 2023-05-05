const path = require('path');
const fs = require('fs');
const fold = 'secret-folder';

fs.readdir(path.join(__dirname, fold), (err, files) => {
  files.forEach((file) => {
    if (err) {
      console.error(err);
    }
    fs.stat(path.join(__dirname, fold, file), (err, el) => {
      if (err) {
        console.log(err);
      }
      if (el.isDirectory()) {
        return;
      }
      const arr = path.basename(file, '').split('.');
      console.log(`${arr[0]} - ${arr[1]} - ${el.size / 1024} kb`);
    });
  });
});