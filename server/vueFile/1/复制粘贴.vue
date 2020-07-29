<template>
    <el-table ref="table"
            :data="tableData"
            style="width: 100%">
        <el-table-column
                label="日期"
                width="180">
            <template slot-scope="scope">
                <el-input v-model="scope.row.date"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="地址" label1="地址" label2="地址">
            <template slot-scope="scope">
                <el-input disabled v-model="scope.row.address"></el-input>
            </template>
        </el-table-column>
        <el-table-column
                label="姓名"
                width="180">
            <template slot-scope="scope">
                <el-input v-model="scope.row.name"></el-input>
            </template>
        </el-table-column>
        <el-table-column
                label="地址1"
                width="180"
                prop="address1">
        </el-table-column>
        <el-table-column
                label="地址2"
                width="180"
                prop="address2">
        </el-table-column>
        <el-table-column
                label="性别"
                width="180">
            <template slot-scope="scope">
                <el-input v-model="scope.row.gender"></el-input>
            </template>
        </el-table-column>
        <el-table-column
                label="年纪"

                width="180">
            <template slot-scope="scope">
                <el-input v-model="scope.row.age"></el-input>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    function getParentNode(tagname,node) {
        var parentnode = node.parentNode
        while(parentnode.tagName.toLowerCase()!=tagname){
            parentnode = parentnode.parentNode
        }
        return parentnode
    }
    export default {
        mounted(){
            this.$nextTick(function () {
                let self = this
                let inputlist = document.querySelectorAll("input")
                let trlist = document.querySelectorAll("tr.el-table__row")
                var input1 = inputlist[0]
                for(let i in inputlist){
                    if(input1==inputlist[i]){
                        var a = i
                        break
                    }}
                var a=0
                this.$refs.table.$el.addEventListener("paste",function (event) { //粘贴事件监听代理
                    event.preventDefault()
                    for(let i in inputlist){
                        if(event.target==inputlist[i]){
                            a = i //获得执行粘贴动作的表格
                            break
                        }}
                    let text = event.clipboardData.getData("text")
                    text = text.replace(/\n$/,'')
                    text = text.split("\n")
                    let len = text.length
                    let text2 = new Array(len).fill(0)
                    text2 = text.map((item,index)=>{
                        return text[index].split("\t")
                    })
                    let l = trlist[2].querySelectorAll("input").length
                    console.log('l',l)
                    let row_ = Math.floor(a/l)
                    let column_
                    let theTd = getParentNode('td',inputlist[a])
                    for(let i in trlist[row_].childNodes){
                        if(trlist[row_].childNodes[i] == theTd){
                            column_ = i
                            break
                        }
                    }
                    let headername = ["date","address","name","address1","address2",'gender','age']//自定义完整表格表头
                    let headername2 = headername.slice(column_)//截取从粘贴位置开始的表头
                    self.$nextTick(function () {
                        for(let i in text2){
                            let ii = Number(row_)+Number(i)
                            let tr = trlist[ii]
                            let td = tr.querySelectorAll('td')
                            headername2.forEach(function (item,idx) {
                               let i2 = i
                                let _idx = Number(column_)+Number(idx)
                                //如果所处td内没有input元素,或者input的disabled属性为真，不粘贴
                                if(!td[_idx].querySelector('input')||td[_idx].querySelector('input').getAttribute('disabled')) return

                                if(self.tableData[ii]&&idx<text2[i2].length){
                                    self.tableData[ii][item] = text2[i2][idx]
                                }
                            })
                        }
                    })
                })

            })

        },
        data() {
            return {
                inputList:[],
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    address1: '上海市普陀区金沙江路 1519 弄',
                    address2: '上海市普陀区金沙江路 1519 弄',
                    age:"18",
                    gender:"female"
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    address1: '上海市普陀区金沙江路 1519 弄',
                    address2: '上海市普陀区金沙江路 1519 弄',
                    age:"18",
                    gender:"female"
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    address1: '上海市普陀区金沙江路 1519 弄',
                    address2: '上海市普陀区金沙江路 1519 弄',
                    age:"18",
                    gender:"female"
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    address1: '上海市普陀区金沙江路 1519 弄',
                    address2: '上海市普陀区金沙江路 1519 弄',
                    age:"18",
                    gender:"female"
                },]
            }
        },
        methods: {

        }
    }
</script>