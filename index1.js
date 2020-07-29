const http = require('http')
const fs = require('fs')
const koa = require('koa')
const app = new koa()
var lessthanMatchNotCatch ="(?:\\>)"
var greaterthanMatchNotCatch ="(?:\\<\\/)"
var number_punctuation_varter = "[，,&%、!！{{}?？\"\"“”'':：‘’（）\+\\d() }>/@A-Za-z\\/\\\\\\s]*"
var chinese ="[\\u4E00-\\u9FA5\\-]+"
var chinese1 ="[\"']([0-9a-zA-Z-?，。,！!@\\s\.]*[\\u4E00-\\u9FA5]+[0-9a-zA-Z-?，。,！!@\\s\.]*)+[\"']"
var chinese2 ="[\`]([0-9a-zA-Z-?，\.。,！!${}@\\s]*[\\u4E00-\\u9FA5]+[0-9a-zA-Z-?${}，\.。,！!@\\s]*)+[\`]"
var leftBacesMatchNoCatch ="(?:\{\{)"
var rightBacesMatchNoCatch ="(?:\}\})"
var data = {
    "发布，更新":'PublishUpdate',
    "已经发布更新！":'HavePublished',
    "auto发布":'autoPublish'

}
app.use(async function (ctx, next) {
    ctx.res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")
    await next() // 执行下一个app.use，当下一个app.use执行完过后，在接着执行下面的语句<br>　　 console.log('4')
})
app.use(async function (ctx, next) {
    var files = []
    var newfiles = []

    var a = await new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/App3.vue', function (err, data) {
            if (err)
                resolve(err);
            else
                resolve(data.toString());
        })
    })

    var reg0 = new RegExp(lessthanMatchNotCatch+'(('+number_punctuation_varter+chinese+number_punctuation_varter+')+)'+greaterthanMatchNotCatch,"gm")
    // console.log(a,reg0)
    var match0 = reg0.exec(a)
    // console.log(match0)
    while(match0){
        // console.log(match0[1])
        a = a.replace(match0[1],(...args)=>{
            //a[0][1]是match尖括号之间的内容，取出尖括号的内容再次匹配

            var c = args[0]
            //  console.log("cccccccccccccccc",c)
            // var reg0_0 = /(?:\{\{)(.+)\?(["'][0-9a-zA-Z]*[\u4E00-\u9FA5]+[0-9a-zA-Z]*["'])\:(["'][0-9a-zA-Z]*[\u4E00-\u9FA5]+[0-9a-zA-Z]*["'])(?:\}\})/g
            var reg0_0 = new RegExp(leftBacesMatchNoCatch+"(.*)+"+rightBacesMatchNoCatch,"gm")


            var match0_0 = reg0_0.exec(c)
            // console.log("match0_0",match0_0)
            while (match0_0){
                c = c.replace(match0_0[1],(...args)=>{
                    // console.log("args",args)
                    var r= new RegExp('('+chinese1+')',"gm")

                    //    console.log(r)
                    var text = args[0].replace(r,(...args)=>{
                        // console.log("argsdatatext",args[0])
                        var text = args[0].replace(/^['"]|['"]$/g,"").replace(/([0-9a-zA-Z]*[\u4E00-\u9FA5]+[0-9a-zA-Z]*)+/g,"$t('datatext')").replace(/[,，？?!！]+/g,arg=>{
                            return  "`" + arg + "`"
                        })
                        return text
                    })
                    console.log(args[0],text)
                    return text
                })

                match0_0 = reg0_0.exec(c)

            }
            console.log(c)
            c=c.replace(new RegExp(chinese,"gm"),(word)=>{
                console.log(word)
                return '{{'+'$t('+'cccc'+')}}'
            })
            return c


        })
        match0 = reg0.exec(a)

    }
    // var lessthanMatchNotCatch ="(?:\\>)"
    // var greaterthanMatchNotCatch ="(?:\\<\\/)"
    // var number_punctuation_varter = "[，,&%、!！{{}?？\"\"“”'':：‘’（）\+\\d() }>/@A-Za-z\\/\\\\\\s]*"
    // var chinese ="[\\u4E00-\\u9FA5]+"
    // var reg0_2 = new RegExp("(?:\\<.*)"+"(\\s+[a-z0-9-_A-Z]+\\s*\\=\\s*[\"']"+"("+number_punctuation_varter+chinese+number_punctuation_varter+")+"+number_punctuation_varter+"[\\\"']\\s+)+"+"(?:.*\\>)","g")
    var reg0_2 = new RegExp("(?:\\<[a-zA-Z-]+)"+"(.*)"+"(?:.*\\>)+?","g")

    var match0_2 = reg0_2.exec(a)
    while(match0_2){
        a = a.replace(match0_2[1],(...args)=>{
            var text = args[0].replace(new RegExp(chinese1,"gm"),(word,...string)=>{
                // console.log("word",word)
                return "dataword"
            }).replace(/(?:\s)[a-zA-Z-]+\s*\=\s*/g,word=>{
                // console.log(word)
                return " :"+word.replace(/^\s/g,'')
            })
            return text
            //console.log(text)
        })
        match0_2 = reg0_2.exec(a)
    }
    // console.log(reg0_2,match0_2)
    //(?<=re)\w+
    var reg0_1 = new RegExp("(?:[a-z0-9-_A-Z]+\\s*(\\:|\\=\\=|\\=\\=\\=|\\=|)\\s*)"+"([\"']"+"("+number_punctuation_varter+chinese+number_punctuation_varter+")+"+number_punctuation_varter+"[\"'])","gm")
    // var reg0_1 = /(?:[a-z0-9-_A-Z]+\s*\:\s*)(["']*(.*)["']*)/g
    var match0_1 = reg0_1.exec(a)

    while (match0_1){
        // console.log(match0_1[0])
        a = a.replace(match0_1[0],(...args)=>{
            console.log(args)
            var text = args[0].replace(new RegExp(chinese1,"gm"),(...args)=>{
                return "this.$t(args[0])"
            })
            // console.log(text)
            return text
        })
        match0_1 = reg0_1.exec(a)
    }

    var reg0_3 = new RegExp("(?:(error|warning|succuess)\\s*\\(\\s*)(.*)(?:\\))","gm")
    console.log(reg0_3)

    // var reg0_1 = /(?:[a-z0-9-_A-Z]+\s*\:\s*)(["']*(.*)["']*)/g
    var match0_3 = reg0_3.exec(a)
    while (match0_3){
        // console.log(match0_3)
        a = a.replace(match0_3[2],(...args)=>{
            console.log(args[0])
            var text = args[0].replace(new RegExp(chinese1,"gm"),"$t('datatttt')").replace(new RegExp(chinese2,"gm"),arg=>{
                var arg = arg.replace(/([0-9a-zA-Z]*[\u4E00-\u9FA5]+[0-9a-zA-Z]*)+/g,"${$t('"+'datatttt'+"')}")
                return arg
            })
            console.log(text)
            return text
        })
        match0_3 = reg0_3.exec(a)
    }

    while (match0_1){
        // console.log(match0_1[0])
        a = a.replace(match0_1[0],(...args)=>{
            // console.log(args)
            var text = args[0].replace(new RegExp(chinese1,"gm"),(...args)=>{
                return "this.$t(args[0])"
            })
            // console.log(text)
            return text
        })
        match0_1 = reg0_1.exec(a)
    }



    fs.writeFile('./App3compile.vue', a,{  }, function(err, data) {
        if (err) {
            throw err;
        }
        // console.log(data);
    });
})


app.listen(3002)