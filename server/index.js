const http = require('http')
const fs = require('fs')
const path = require('path')
const koa = require('Koa')
const app = new koa()
var xlsx = require('node-xlsx');
var lessthanMatchNotCatch ="(?:\\>)"
var greaterthanMatchNotCatch ="(?:\\<\\/)"
var number_punctuation_letter = "[，,&%、!！{{}?？\"\"“”'':：‘’（）\+\\d() }>/@A-Za-z\\/\\\\\\s]*"
var chineseAndCrossbar ="[\\u4E00-\\u9FA5\\-]+"
var chieseNoQuation ="([0-9a-zA-Z-?，。,！!@\\s\.\\n\\=\\'\"]*[\\u4E00-\\u9FA5]+[0-9a-zA-Z-?，。,！!@\\s\.\\n\\=\\'\"]*)+"
var chineseAndLetter = "([0-9a-zA-Z-]*[\\u4E00-\\u9FA5]+[0-9a-zA-Z-]*)+"
var chineseAndLetterWithQuation = "[\"']([0-9a-zA-Z-]*[\\u4E00-\\u9FA5]+[0-9a-zA-Z-]*)+[\"']"
var quotationwithChinese ="[\"']([0-9a-zA-Z-?，。,！!@\\s\.]*[\\u4E00-\\u9FA5]+[0-9a-zA-Z-?，。,！!@\\s\.]*)+[\"']"
var chieseNoQuation2 ="([0-9a-zA-Z-?，。,！!@\\s\.]*[\\u4E00-\\u9FA5]+[0-9a-zA-Z-?，。,！!@\\s\.]*)+"
var backquotewithChinese ="[\`]([0-9a-zA-Z-?，\.。,！!${}@\\s]*[\\u4E00-\\u9FA5]+[0-9a-zA-Z-?${}，\.。,！!@\\s]*)+[\`]"
var leftBacesMatchNoCatch ="(?:\{\{)"
var rightBacesMatchNoCatch ="(?:\}\})"
var data = {}
var wordNotExist =new Set()
wordNotExist.clear()
function checkIfWordHaveTranslation(word){
    return !!data[word]
}

async function fileDisplay(filePath,cb){
    //根据文件路径读取文件，返回文件列表
    if(filePath.endsWith('vueFile'))
        fs.mkdir(filePath+"AfterReplace",()=>{
            console.log("创建成功"+filePath+"AfterReplace")
        })
    else {
        fs.mkdir(filePath.replace("\\vueFile\\","\\vueFileAfterReplace\\"),()=>{
            console.log("创建成功"+filePath.replace("\\vueFile\\","\\vueFileAfterReplace\\"))
        })
    }

    fs.readdir(filePath,async function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,async function(eror, stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            await cb(filedir)
                        }
                        if(isDir){
                            await fileDisplay(filedir,replaceFileContent);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}

async function replaceFileContent(dirname){
    var fileContent = await new Promise((resolve, reject) => {
        // __dirname + '/App3.vue'
        fs.readFile(dirname, function (err, data) {
            if (err)
                resolve(err);
            else
                resolve(data.toString());
        })
    })
    var reg0 = new RegExp(lessthanMatchNotCatch+'(('+number_punctuation_letter+chineseAndCrossbar+number_punctuation_letter+')+)'+greaterthanMatchNotCatch,"g")
    //获得匹配结果，也就是尖括号之间的内容，match0[1]
    var match0 = reg0.exec(fileContent)
    while(match0){
        fileContent= fileContent.replace(match0[1],(...args)=>{
            var content = args[0]
            //获得尖括号内{{}}的内容，例如label="{a==1?'确定':'删除'}"
            var reg0_0 = new RegExp(leftBacesMatchNoCatch+"(.*)+"+rightBacesMatchNoCatch,"gm")
            var match0_0 = reg0_0.exec(content)
            while (match0_0){
                content = content.replace(match0_0[1],(...args)=>{
                    var sentences= new RegExp('('+quotationwithChinese+')',"gm")
                    let text = args[0].replace(sentences,(...args)=>{
                        let text = args[0].replace(/^['"]|['"]$/g,"").replace(new RegExp(chieseNoQuation,"g"),arg=>{
                            let wordaftertranslate = arg.replace(new RegExp(chineseAndLetter,"g"),word=>{
                                    if(checkIfWordHaveTranslation(word)) return "$t('"+data[word]+"')"
                                    else {
                                        wordNotExist.add(word)
                                        return word
                                    }
                                }
                            )
                            return wordaftertranslate

                        }).replace(/[,，？?!！]+/g,arg=>{
                            return  "`" + arg + "`"
                        })
                        return text
                    })
                    return text
                })
                match0_0 = reg0_0.exec(content)
            }
            content=content.replace(new RegExp(chineseAndLetter,"gm"),(word)=>{
                word = word.replace(/^['"]|['"]$/g,"")
                if(checkIfWordHaveTranslation(word)) return "{{$t('"+data[word]+"')}}"
                else {
                    wordNotExist.add(word)
                    return word
                }
            })
            return content
        })
        match0 = reg0.exec(fileContent)
    }
    var reg0_2 = new RegExp("(?:\\<([a-zA-Z-]+[0-9]*)+)([\\s\\S]*?)(?:\\>)+?","gm")
    var match0_2 = reg0_2.exec(fileContent)
    while(match0_2){
        fileContent= fileContent.replace(match0_2[0],(...args)=>{
            var text= args[0].replace(new RegExp("(?:\\s*)([a-zA-Z-][0-9]*)+\\s*\\=\\s*"+"(?:[\"'])"+chieseNoQuation2+"(?:[\"']\\s*)","gm"),word=>{
                let word1 =word.replace(new RegExp(chineseAndLetter),word=>{
                    if(checkIfWordHaveTranslation(word)) return "$t('"+data[word]+"')"
                    else {
                        wordNotExist.add(word)
                        return word
                    }
                })
                if( a = !new RegExp(chineseAndLetter,"g").test(word1)){
                    word1 = word1.replace(/(^\s*)/,'$1:')
                }
                return word1
            })
            return text

        })
        match0_2 = reg0_2.exec(fileContent)
    }
    var reg0_1 = /(?:([a-z_\-A-Z\[\]]+[0-9]*)+)\s*(\:|\=|\=\=|\=\=\=)\s*([\"']([0-9a-zA-Z-_\s+]*[\u4E00-\uF9A5]+[0-9a-zA-Z-_\s+]*)+?[\"'])/gm
    var match0_1 = reg0_1.exec(fileContent)
    while (match0_1){
        fileContent= fileContent.replace(match0_1[0],(...args)=>{
            let text = args[0].replace(new RegExp(quotationwithChinese,"gm"),(word)=>{
                let word1 =  word.replace(/^['"]|['"]$/g,"")
                if(checkIfWordHaveTranslation(word1)) {
                    return "this.$t('"+data[word1]+"')"
                }
                else {
                    wordNotExist.add(word1)
                    return word
                }
            })
            return text
        })
        match0_1 = reg0_1.exec(fileContent)
    }

    var reg0_3 = new RegExp("(?:(error|warning|succuess|message)\\s*\\(\\s*)(.*)(?:\\))","gm")
    var match0_3 = reg0_3.exec(fileContent)
    while (match0_3){
        fileContent= fileContent.replace(match0_3[2],(...args)=>{
            var text = args[0].replace(new RegExp(quotationwithChinese,"gm"),word=>{
                let word1 =  word.replace(/^['"]|['"]$/g,"")
                if(checkIfWordHaveTranslation(word1)) {
                    return "this.$t('"+data[word1]+"')"
                }
                else {
                    wordNotExist.add(word1)
                    return word
                }
            })
                text=text.replace(new RegExp(backquotewithChinese,"gm"),arg=>{
                var arg = arg.replace(new RegExp(chineseAndLetter,"g"),word=>{
                    let word1 =  word.replace(/^['"]|['"]$/g,"")
                    if(checkIfWordHaveTranslation(word1)) {
                        return"${$t('"+data[word1]+"')}"
                    }
                    else {
                        wordNotExist.add(word1)
                        return word
                    }
                })
                return arg
            })
            return text
        })
        match0_3 = reg0_3.exec(fileContent)
    }
    var reg0_4 =new RegExp(quotationwithChinese+"+?","gm")
    var match0_4 = reg0_4.exec(fileContent)
    while (match0_4){
        fileContent= fileContent.replace(match0_4[0],(...args)=>{
            var text = args[0].replace(new RegExp(quotationwithChinese,"gm"),(word)=>{
                let word1 =  word.replace(/^['"]|['"]$/g,"")
                if(checkIfWordHaveTranslation(word1)) {
                    return "this.$t('"+data[word1]+"')"
                }
                else {
                    wordNotExist.add(word1)
                    return word
                }
            })
            return text
        })
        match0_4 = reg0_4.exec(fileContent)
    }
    var newDir = dirname.replace("\\server\\vueFile\\","\\server\\vueFileAfterReplace\\")
    fs.writeFile(newDir, fileContent,{  }, function(err, data) {
        if (err) {
            throw err;
        }
        wordNotExist.forEach(wordkey=>{
            dataToWrite.push([wordkey,''])
        })
        wordNotExist.clear()
        let xlsxObj= [{
            name:fileName,
            data:dataToWrite
        }]
        fs.writeFileSync('./translationLost.xlsx',xlsx.build(xlsxObj),"binary");

    });
}

var fileName = ""
var dataToWrite = []

app.use(async function (ctx, next) {
    //在这里先读一下excel
    var sheets = xlsx.parse('./excelfortranslation.xlsx');
    fileName = sheets[0].name
    dataToWrite = sheets[0].data
    sheets.forEach(sheet=>{
        sheet.data.forEach(row=>{
            data[row[0]]=row[1]
        })
    })
    fileDisplay(path.resolve(__dirname+'/vueFile'),replaceFileContent)
    //data是由excel转换过来的对应的对象
    wordNotExist.forEach(wordkey=>{
        dataToWrite.push([wordkey,''])
    })

    await next()
})


app.listen(3002)