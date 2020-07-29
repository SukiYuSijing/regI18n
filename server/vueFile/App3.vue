<template>
    <div>
        <el-button @click="handleClick">{{!show?"展开":"收起"}}工作/爱好列</el-button>
        <slot :child="child"></slot>
        <el-table ref="table"
                  v-paste
                  :span-method="spanMethod"
                  :data="tableData"
                  :header-cell-class-name="getHeaderCellStyle"
                  :cell-class-name="getCellClassName"
                  style="width: 100%">
            <!--合并单元格-->
           <el-table-column label="合并单元格1" prop="combineCell1">
                    <!--width="180"-->
                    <!--name = "combineCell1"-->
                    <!--prop="combineCell1">-->
            </el-table-column>
            <el-table-column label="合并单元格2"  width="180" name = "combineCell2" prop="combineCell2"></el-table-column>
            <el-table-column
                    label="合并单元格3"
                    width="180"
                    name = "combineCell3"
                    prop="combineCell3">
            </el-table-column>
            <!---->
            <el-table-column
                    label="日期"
                    width="180"
                    name = "date"
                    prop="date">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.date"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="job"
                    v-if="show"
                    label="工作"
                    name = "job"
                    width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.job"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="hobby"
                    v-if="show"
                    label="兴趣"
                    name = "hobby"
                    width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.hobby"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="地址" prop="address"  name = "address">
                <!--<template slot-scope="scope">-->
                    <!--<el-input v-model="scope.row.address"></el-input>-->
                <!--</template>-->
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    name = "name"
                    width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.name"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    label="地址1"
                    width="180"
                    prop="address1">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.address1"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    label="地址2"
                    name = "address2"
                    width="180"
                    prop="address2">
                <template slot-scope="scope">
                    <el-input disabled v-model="scope.row.address2"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="gender"
                    label="性别"
                    name = "gender"
                    width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.gender"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    label="年纪"
                    name = "age"
                    prop="age"
                    width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.age"></el-input>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    var headername = []
    function getParentNode(tagname,node) {
        if(!node) return
        var parentnode = node.parentNode
        while(parentnode&&parentnode.tagName.toLowerCase()!=tagname){
            parentnode = parentnode.parentNode
        }
        return parentnode
    }
    export default {
        created(){
            headername =[]
        },
        mounted(){
            console.log(this)
            console.log("APP3 mounted")
            this.getSpanList()
            this.$message("你好"+this.show,window.a)
            this.$message(`你好${this.show}`,window.a)
            if(false){
                console.error("你好",window.a)
                console.error("你好")
            }


        },

        data() {
            return {
                child:11,
                headername:[],
                show:true,
                inputList:[],
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    job:"学生",
                    hobby:"游戏",
                    combineCell1:"合并单元格1-1",
                    combineCell2:"合并单元格2-1",
                    combineCell3:"合并单元格3-1",
                    address: '上海市普陀区金沙江路 1518 弄',
                    address1: '上海市普陀区金沙江路 1519 弄',
                    address2: '上海市普陀区金沙江路 1519 弄',
                    age:"18",
                    gender:"female"
                },{
                    date: '2016-05-02',
                    name: '王小虎',
                    job:"学生",
                    hobby:"游戏",
                    combineCell1:"合并单元格1-1",
                    combineCell2:"合并单元格2-1",
                    combineCell3:"合并单元格3-1",
                    address: '上海市普陀区金沙江路 1518 弄',
                    address1: '上海市普陀区金沙江路 1519 弄',
                    address2: '上海市普陀区金沙江路 1519 弄',
                    age:"18",
                    gender:"female"
                },{
                    date: '2016-05-02',
                    name: '王小虎',
                    job:"学生",
                    hobby:"游戏",
                    combineCell1:"合并单元格1-1",
                    combineCell2:"合并单元格2-1",
                    combineCell3:"合并单元格3-2",
                    address: '上海市普陀区金沙江路 1518 弄',
                    address1: '上海市普陀区金沙江路 1519 弄',
                    address2: '上海市普陀区金沙江路 1519 弄',
                    age:"18",
                    gender:"female"
                },{
                    date: '2016-05-02',
                    name: '王小虎',
                    job:"学生",
                    hobby:"游戏",
                    combineCell1:"合并单元格1-2",
                    combineCell2:"合并单元格2-2",
                    combineCell3:"合并单元格3-1",
                    address: '上海市普陀区金沙江路 1518 弄',
                    address1: '上海市普陀区金沙江路 1519 弄',
                    address2: '上海市普陀区金沙江路 1519 弄',
                    age:"18",
                    gender:"female"
                },{
                    date: '2016-05-02',
                    name: '王小虎',
                    job:"学生",
                    hobby:"游戏",
                    combineCell1:"合并单元格1-2",
                    combineCell2:"合并单元格2-3",
                    combineCell3:"合并单元格3-1",
                    address: '上海市普陀区金沙江路 1518 弄',
                    address1: '上海市普陀区金沙江路 1519 弄',
                    address2: '上海市普陀区金沙江路 1519 弄',
                    age:"18",
                    gender:"female"
                },{
                    date: '2016-05-02',
                    name: '王小虎',
                    job:"学生",
                    hobby:"游戏",
                    combineCell1:"合并单元格1-2",
                    combineCell2:"合并单元格2-3",
                    combineCell3:"合并单元格3-1",
                    address: '上海市普陀区金沙江路 1518 弄',
                    address1: '上海市普陀区金沙江路 1519 弄',
                    address2: '上海市普陀区金沙江路 1519 弄',
                    age:"18",
                    gender:"female"
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    job:"学生",
                    hobby:"游戏",
                    combineCell1:"合并单元格1-3",
                    combineCell2:"合并单元格2-4",
                    combineCell3:"合并单元格3-3",
                    address: '上海市普陀区金沙江路 1517 弄',
                    address1: '上海市普陀区金沙江路 1519 弄',
                    address2: '上海市普陀区金沙江路 1519 弄',
                    age:"18",
                    gender:"female"
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    job:"学生",
                    hobby:"游戏",
                    combineCell1:"合并单元格1-3",
                    combineCell2:"合并单元格2-4",
                    combineCell3:"合并单元格3-1",
                    address: '上海市普陀区金沙江路 1519 弄',
                    address1: '上海市普陀区金沙江路 1519 弄',
                    address2: '上海市普陀区金沙江路 1519 弄',
                    age:"18",
                    gender:"female"
                }, {
                    date: '2016-05-03',
                    name: '王小虎2',
                    job:"学生",
                    hobby:"游戏",
                    combineCell1:"合并单元格1-3",
                    combineCell2:"合并单元格2-5",
                    combineCell3:"合并单元格3-1",
                    address: '上海市普陀区金沙江路 1516 弄',
                    address1: '上海市普陀区金沙江路 1519 弄',
                    address2: '上海市普陀区金沙江路 1519 弄',
                    age:"18",
                    gender:"female"
                },{
                    date: '2016-05-03',
                    name: '王小虎2',
                    job:"学生",
                    hobby:"游戏",
                    combineCell1:"合并单元格1-4",
                    combineCell2:"合并单元格2-5",
                    combineCell3:"合并单元格3-2",
                    address: '上海市普陀区金沙江路 1516 弄',
                    address1: '上海市普陀区金沙江路 1519 弄',
                    address2: '上海市普陀区金沙江路 1519 弄',
                    age:"18",
                    gender:"female"
                }],
                spanList1:[],
                spanList2:[],
                spanList3:[],
                spanList4:[],
            }
        },
        created(){
          this.getSpanList()
        },
        methods: {
            spanMethod({ row, column, rowIndex, columnIndex }){
                if(columnIndex == 0 && this.spanList1[rowIndex]){
                    return {
                            rowspan: Number(this.spanList1[rowIndex]),
                            colspan: 1
                    }
                }else if (columnIndex == 1 && this.spanList2[rowIndex]){
                    return {
                        rowspan: Number(this.spanList2[rowIndex]),
                        colspan: 1
                    }
                } else if (columnIndex == 2 && this.spanList3[rowIndex]){
                    return {
                        rowspan: Number(this.spanList3[rowIndex]),
                        colspan: 1
                    }
                }else if (columnIndex == 7 && this.spanList4[rowIndex]){
                    return {
                        rowspan: Number(this.spanList4[rowIndex]),
                        colspan: 1
                    }
                }else if (columnIndex >=3&&columnIndex !=7){
                    return {
                        rowspan: 1,
                        colspan: 1
                    }
                }else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    }
                }
            },
            getSpanList(){
                for(let rowIndex in this.tableData){
                    //console.log(Number(rowIndex)+1>=this.tableData.length)
                    if(rowIndex==0||this.tableData[rowIndex].combineCell1!=this.tableData[rowIndex - 1].combineCell1){
                        this.spanList1.push(rowIndex)
                        this.spanList2.push(rowIndex)
                        this.spanList3.push(rowIndex)
                        // this.spanList4.push(rowIndex)
                    }else if(this.tableData[rowIndex].combineCell2!=this.tableData[rowIndex - 1].combineCell2){
                        this.spanList2.push(rowIndex)
                        this.spanList3.push(rowIndex)
                    }else if(this.tableData[rowIndex].combineCell3!=this.tableData[rowIndex - 1].combineCell3){
                        this.spanList3.push(rowIndex)
                    }
                    if(rowIndex==0||this.tableData[rowIndex].name!=this.tableData[rowIndex - 1].name){
                        // address: '上海市普陀区金沙江路 1516 弄',
                        //     address1: '上海市普陀区金沙江路 1519 弄',
                        //     address2: '上海市普陀区金沙江路 1519 弄',
                        this.spanList4.push(rowIndex)
                    }
                    if(Number(rowIndex)+1>=this.tableData.length){
                        //console.log(rowIndex,Number(rowIndex)+1)
                        this.spanList1.push(Number(rowIndex)+1)
                        this.spanList2.push(Number(rowIndex)+1)
                        this.spanList3.push(Number(rowIndex)+1)
                        this.spanList4.push(Number(rowIndex)+1)
                    }
                }
                function transferArrToObj(arr){
                    var obj = {}
                    // debugger
                    for(let i in arr){
                        if(arr[Number(i)+1]){
                            obj[arr[i]] =Number(arr[Number(i)+1])-Number(arr[i])
                        }
                    }
                    //console.log(obj)
                    return obj
                }

                this.spanList1 = transferArrToObj(this.spanList1)
                this.spanList2 = transferArrToObj(this.spanList2)
                this.spanList3 = transferArrToObj(this.spanList3)
                this.spanList4 = transferArrToObj(this.spanList4)

                // return {
                //     rowspan: 0,
                //     colspan: 0
                // };
            },
            handleClick(){
                this.show = !this.show
            },
            getHeaderCellStyle({row, column, rowIndex, columnIndex}){
                //获得标题，这里需要在上面设置prop属性

            },
            getCellClassName({row, column, rowIndex, columnIndex}){
                //获得标题，这里需要在上面设置prop属性
                return ' _headerName_'+column.property+' '
            }
        }
    }
</script>