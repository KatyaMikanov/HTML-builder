const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

let writeableStream = fs.createWriteStream("02-write-file/file.txt");
//console.log('Hello! Write some text, please.');

process.on('exit', () => stdout.write('Thank you! Goodbye!'));
process.on('SIGINT', () => process.exit());
stdout.write('Write some text, please.\n');

stdin.on('data', data => {
    if (data.toString().slice(0, data.toString().indexOf('\n') - 1) === 'exit') process.exit();
    let text = data.toString().slice(0, data.toString().indexOf('\n') - 1);
    fs.appendFile(
        path.join(__dirname, 'file.txt'),
        `${text}\n`,
        err => {
            if (err) throw err;
        }
    );
    stdout.write('Write some text, please.\n')
});