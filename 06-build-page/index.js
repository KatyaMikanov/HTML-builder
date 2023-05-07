const fs = require('fs');
const path = require('path');

const urlNewDirectiry = path.join(__dirname, 'project-dist');
const urlStyles = path.join(__dirname, 'styles');

//create new directiry 'project-dist'
const fsPromises = fs.promises;
fsPromises.mkdir(urlNewDirectiry, { recursive: true });





//part CSS
const newCssFile = path.join(__dirname, 'project-dist', 'style.css')
let writeableStream = fs.createWriteStream(newCssFile);
fs.readdir(urlStyles, (err, files) => {
    files.forEach((file) => {
        if (err) {
            console.error(err);
        }
        const originalFilePath = path.join(urlStyles, file);
        fs.stat(originalFilePath, (err, el) => {
            if (err) {
                console.log(err);
            } else if (el.isFile() && path.basename(file, '').split('.')[1] === 'css') {
                fs.createReadStream(originalFilePath).pipe(writeableStream);
            }
        });
    });
});



//part assets
const urlSourceAssets = path.join(__dirname, 'assets');

const urlProjectDist = path.join(__dirname, 'project-dist');
const urlNewAssets = path.join(__dirname, 'project-dist', 'assets');

fsPromises.mkdir(urlNewAssets, { recursive: true });

fsPromises.mkdir(urlNewAssets, { recursive: true });

const copyDir = async (source, output) => {
  try {
    await createFolder(output);
    const folderData = await readFolder(source);
    await copyFiles(folderData, source, output);
  } catch (e) {
    throw new Error(e);
  }
};

const createFolder = async (folder) => {
  fs.promises.mkdir(folder, { recursive: true });
};

const readFolder = async (folder) => {
  const filesNames = await fs.promises.readdir(folder, {
    withFileTypes: true,
  });

  return filesNames;
};

const copyFiles = async (filesNames, sourceFolder, outputFolder) => {
  for (let file of filesNames) {
    const sourceFile = path.join(sourceFolder, file.name);
    const outputFile = path.join(outputFolder, file.name);
    if (file.isFile()) {
      await fs.promises.copyFile(sourceFile, outputFile);
    } else {
      await copyDir(sourceFile, outputFile);
    }
  }
};


//part template
const template = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');

const buildTemplate = async (template, urlProjectDist) => {
  let templateHTML = await fs.promises.readFile(template, 'utf8');
  const matches = templateHTML.matchAll(/{{(.*?)}}/g);

  for (let match of matches) {
    const componentName = match[1];
    let componentFile = path.join(components, `${componentName}.html`);
    const componentHTML = await fs.promises.readFile(componentFile, 'utf8');

    templateHTML = templateHTML.replace(match[0], componentHTML);
  }

  await fs.promises.writeFile(
    path.join(urlProjectDist, 'index.html'),
    templateHTML,
    'utf-8'
  );
};





const build = async () => {
  await createFolder(urlProjectDist);
  await copyDir(urlSourceAssets, urlNewAssets);
  await buildTemplate(template, urlProjectDist);
};

build();

