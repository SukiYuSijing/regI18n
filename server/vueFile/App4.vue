<template>
    <div>
        <slot :child="child"></slot>
        <el-button @click="handleClick">{{!show?"展开":"收起"}}工作/爱好列</el-button>

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
            debugger
            console.log(this)


        },

        data() {
            return {
                child:"app4",
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
                    address1111: '上海市普陀区金沙江路 1518 弄',
                    address11111: '上海市普陀区金沙江路 1519 弄',
                    address11112: '上海市普陀区金沙江路 1519 弄',
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
                    address1111: '上海市普陀区金沙江路 1518 弄',
                    address11111: '上海市普陀区金沙江路 1519 弄',
                    address11112: '上海市普陀区金沙江路 1519 弄',
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
                    address1111: '上海市普陀区金沙江路 1518 弄',
                    address11111: '上海市普陀区金沙江路 1519 弄',
                    address11112: '上海市普陀区金沙江路 1519 弄',
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
                    address1111: '上海市普陀区金沙江路 1518 弄',
                    address11111: '上海市普陀区金沙江路 1519 弄',
                    address11112: '上海市普陀区金沙江路 1519 弄',
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
                    address1111: '上海市普陀区金沙江路 1518 弄',
                    address11111: '上海市普陀区金沙江路 1519 弄',
                    address11112: '上海市普陀区金沙江路 1519 弄',
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
                    address1111: '上海市普陀区金沙江路 1518 弄',
                    address11111: '上海市普陀区金沙江路 1519 弄',
                    address11112: '上海市普陀区金沙江路 1519 弄',
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
                    address1111: '上海市普陀区金沙江路 1517 弄',
                    address11111: '上海市普陀区金沙江路 1519 弄',
                    address11112: '上海市普陀区金沙江路 1519 弄',
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
                    address1111: '上海市普陀区金沙江路 1519 弄',
                    address11111: '上海市普陀区金沙江路 1519 弄',
                    address11112: '上海市普陀区金沙江路 1519 弄',
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
                    address1111: '上海市普陀区金沙江路 1516 弄',
                    address11111: '上海市普陀区金沙江路 1519 弄',
                    address11112: '上海市普陀区金沙江路 1519 弄',
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
                    address1111: '上海市普陀区金沙江路 1516 弄',
                    address11111: '上海市普陀区金沙江路 1519 弄',
                    address11112: '上海市普陀区金沙江路 1519 弄',
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
                        // address1111: '上海市普陀区金沙江路 1516 弄',
                        //     address11111: '上海市普陀区金沙江路 1519 弄',
                        //     address11112: '上海市普陀区金沙江路 1519 弄',
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

<!--<template>-->
    <!--<div>-->
        <!--<slot :child="childrenSlot"></slot>-->
        <!--<TestChild>123</TestChild>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--export default {-->
        <!--name:'MyTest',-->
        <!--data(){-->
            <!--return {-->
                <!--childrenSlot:"childrenSlot"-->
            <!--}-->
        <!--},-->
        <!--components:{-->
            <!--TestChild:{-->
                <!--render(h){-->
                    <!--var getParent = (vm) =>{-->
                        <!--//console.log(vm.$parent)-->
                        <!--if(vm.$parent.$vnode.tag ==="vue-component-87-MyTest"){-->
                            <!--return vm.$parent-->
                        <!--}else if(vm.$parent){-->
                            <!--vm = vm.$parent-->
                        <!--}else{-->
                            <!--return vm-->
                        <!--}-->
                    <!--}-->
                    <!--var _this = getParent(this)-->
                    <!--debugger-->
                    <!--var a = _this.$scopedSlots.default?-->
                        <!--_this.$scopedSlots.default(this.TestChild1):this.TestChild1-->
                    <!--return h('p',{color:'red'},typeof a =='string'?a:a[0].text)-->

                <!--},-->
                <!--data(){-->
                    <!--return {-->
                        <!--TestChild1:"TestChild1"-->
                    <!--}-->
                <!--}-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->