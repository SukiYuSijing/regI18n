const http = require('http');
const fs = require('fs');
const path = require('path');
const koa = require('Koa');
const app = new koa();
var xlsx = require('node-xlsx');
var regExpExchange = require('./reg.js');
var data = {};
var wordNotExist = new Set();
wordNotExist.clear();

async function fileDisplay(filePath, cb) {
  //根据文件路径读取文件，返回文件列表
  if (filePath.endsWith('vueFile'))
    fs.mkdir(filePath + 'AfterReplace', () => {
      console.log('创建成功' + filePath + 'AfterReplace');
    });
  else {
    fs.mkdir(filePath.replace('\\vueFile\\', '\\vueFileAfterReplace\\'), () => {
      console.log(
        '创建成功' + filePath.replace('\\vueFile\\', '\\vueFileAfterReplace\\')
      );
    });
  }

  fs.readdir(filePath, async function (err, files) {
    if (err) {
      console.warn(err);
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, async function (eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            var isFile = stats.isFile(); //是文件
            var isDir = stats.isDirectory(); //是文件夹
            if (isFile) {
              await cb(filedir);
            }
            if (isDir) {
              await fileDisplay(filedir, replaceFileContent); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        });
      });
    }
  });
}

async function replaceFileContent(dirname, data) {
  // console.log(data);
  var fileContent = await new Promise((resolve, reject) => {
    // __dirname + '/App3.vue'
    fs.readFile(dirname, function (err, data) {
      if (err) resolve(err);
      else resolve(data.toString());
    });
  });
  fileContent = regExpExchange(fileContent, data, wordNotExist);
  // console.log(fileContent);
  var newDir = dirname.replace(
    '\\server\\vueFile\\',
    '\\server\\vueFileAfterReplace\\'
  );
  fs.writeFile(newDir, fileContent, {}, function (err, data) {
    if (err) {
      throw err;
    }
    wordNotExist.forEach((wordkey) => {
      dataToWrite.push([wordkey, '']);
    });
    wordNotExist.clear();
    let xlsxObj = [
      {
        name: fileName,
        data: dataToWrite,
      },
    ];
    fs.writeFileSync('./translationLost.xlsx', xlsx.build(xlsxObj), 'binary');
  });
}

var fileName = '';
var dataToWrite = [];

app.use(async function (ctx, next) {
  //在这里先读一下excel
  var sheets = xlsx.parse('./excelfortranslation.xlsx');
  fileName = sheets[0].name;
  dataToWrite = sheets[0].data;
  sheets.forEach((sheet) => {
    sheet.data.forEach((row) => {
      data[row[0]] = row[1];
    });
  });
  fileDisplay(path.resolve(__dirname + '/vueFile'), (dirname) =>
    replaceFileContent(dirname, data)
  );
  //data是由excel转换过来的对应的对象
  wordNotExist.forEach((wordkey) => {
    dataToWrite.push([wordkey, '']);
  });

  await next();
});

app.listen(3002);
