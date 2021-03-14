<template>
  <div>
    <el-popover placement="top" width="160" v-model="visible">
      <p>{{ $t('ABCDE159') }}？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">{{
          $t('ABCDE160')
        }}</el-button>
        <el-button type="primary" size="mini" @click="visible = false">{{
          $t('ABCDE161')
        }}</el-button>
      </div>
      <el-button slot="reference">{{ $t('ABCDE162') }}</el-button>
    </el-popover>
    <el-button @click="handleClick"
      >{{ !show ? $t('collapse')`！` : $t('fold')`？` }}{{ $t('job') }}/{{
        $t('hobbyColumn')
      }}</el-button
    >
    <slot :child="child"></slot>
    <el-table
      ref="table"
      v-paste
      :span-method="spanMethod"
      :data="tableData"
      :header-cell-class-name="getHeaderCellStyle"
      :cell-class-name="getCellClassName"
      style="width: 100%"
    >
      <el-table-column
        :color="$t('ABCDE178')"
        :fanling="$t('ABCDE177')"
        :name-of-final="$t('ABCDE165')"
        :label="$t('ABCDE127')"
        width="180"
        name="combineCell1"
        prop="combineCell1"
      >
      </el-table-column>
      <el-table-column
        :color="$t('ABCDE178')"
        :fanling="$t('ABCDE179')"
        :name-of-final="$t('ABCDE165')"
        :label="$t('ABCDE128')"
        width="180"
        name="combineCell2"
        prop="combineCell2"
      >
      </el-table-column>
      <el-table-column
        :color="$t('ABCDE178')"
        :fanling="$t('ABCDE179')"
        :name-of-final="$t('ABCDE165')"
        :label="$t('ABCDE129')"
        width="180"
        name="combineCell3"
        prop="combineCell3"
      >
      </el-table-column>
      <el-table-column
        :color="$t('ABCDE178')"
        :fanling="$t('ABCDE179')"
        :name-of-final="$t('ABCDE165')"
        :label="$t('ABCDE130')"
        width="180"
        name="date"
        prop="date"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.date"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        :color="$t('ABCDE178')"
        :fanling="$t('ABCDE179')"
        :name-of-final="$t('ABCDE165')"
        prop="job"
        v-if="show"
        :label="$t('job')"
        name="job"
        width="180"
      >
        <template slot-scope="scope">
          <el-popover placement="top" width="160" v-model="visible">
            <p>{{ $t('ABCDE159') }}？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">{{
                $t('ABCDE160')
              }}</el-button>
              <el-button type="primary" size="mini" @click="visible = false">{{
                $t('ABCDE161')
              }}</el-button>
            </div>
            <el-button slot="reference">{{ $t('ABCDE162') }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        :color="$t('ABCDE178')"
        :fanling="$t('ABCDE179')"
        :name-of-final="$t('ABCDE165')"
        prop="hobby"
        v-if="show"
        :label="$t('ABCDE131')"
        name="hobby"
        width="180"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.hobby"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        :color="$t('ABCDE176')"
        :fanling="$t('ABCDE177')"
        :name-of-final="$t('ABCDE165')"
        :bel="$t('ABCDE132')"
        prop="address"
        name="address"
      >
      </el-table-column>
      <el-table-column
        :color="$t('ABCDE176')"
        :fanling="$t('ABCDE177')"
        :name-of-final="$t('ABCDE165')"
        prop="name"
        :label="$t('ABCDE133')"
        name="name"
        width="180"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        :color="$t('ABCDE178')"
        :fanling="$t('ABCDE179')"
        :name-of-final="$t('ABCDE165')"
        :label="$t('ABCDE134')"
        width="180"
        prop="address1"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.address1"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        :color="$t('ABCDE178')"
        :fanling="$t('ABCDE179')"
        :name-of-final="$t('ABCDE165')"
        :label="$t('ABCDE135')"
        name="address2"
        width="180"
        prop="address2"
      >
        <template slot-scope="scope">
          <el-select v-model="value" :placeholder="$t('ABCDE123')">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        :color="$t('ABCDE178')"
        :fanling="$t('ABCDE179')"
        :name-of-final="$t('ABCDE165')"
        prop="gender"
        :label="$t('ABCDE136')"
        name="gender"
        width="180"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.gender"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        :color="$t('ABCDE178')"
        :fanling="$t('ABCDE179')"
        :name-of-final="$t('ABCDE165')"
        :label="$t('ABCDE137')"
        name="age"
        prop="age"
        width="180"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.age"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-select v-model="value" :placeholder="$t('ABCDE123')">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
var headername = [];
function getParentNode(tagname, node) {
  if (!node) return;
  var parentnode = node.parentNode;
  while (parentnode && parentnode.tagName.toLowerCase() != tagname) {
    parentnode = parentnode.parentNode;
  }
  return parentnode;
}
export default {
  created() {
    headername = [];
  },
  mounted() {
    console.log(this);
    console.log('APP3 mounted');
  },

  data() {
    return {
      option1: ['黄金糕', '双皮奶', '蚵仔煎', '龙须面', '北京烤鸭'],
      options: [
        {
          value: this.$t('ABCDE171'),
          label: this.$t('ABCDE166'),
        },
        {
          value: this.$t('ABCDE172'),
          label: this.$t('ABCDE167'),
          disabled: true,
        },
        {
          value: this.$t('ABCDE173'),
          label: this.$t('ABCDE168'),
        },
        {
          value: this.$t('ABCDE174'),
          label: this.$t('ABCDE169'),
        },
        {
          value: this.$t('ABCDE175'),
          label: this.$t('ABCDE170'),
        },
      ],
      value: '',
      visible: false,
      show: 1,
      show2: 2,
      child: 11,
      headername: [],
      show: true,
      inputList: [],
      tableData: [
        {
          date: '2016-05-02',
          name: this.$t('ABCDE138'),
          job: this.$t('ABCDE139'),
          hobby: this.$t('ABCDE140'),
          combineCell1: this.$t('ABCDE141'),
          combineCell2: this.$t('ABCDE142'),
          combineCell3: this.$t('ABCDE143'),
          address: this.$t('ABCDE144'),
          address1: this.$t('ABCDE145'),
          address2: this.$t('ABCDE145'),
          age: '18',
          gender: 'female',
        },
        {
          date: '2016-05-02',
          name: this.$t('ABCDE138'),
          job: this.$t('ABCDE139'),
          hobby: this.$t('ABCDE140'),
          combineCell1: this.$t('ABCDE141'),
          combineCell2: this.$t('ABCDE142'),
          combineCell3: this.$t('ABCDE143'),
          address: this.$t('ABCDE144'),
          address1: this.$t('ABCDE145'),
          address2: this.$t('ABCDE145'),
          age: '18',
          gender: 'female',
        },
        {
          date: '2016-05-02',
          name: this.$t('ABCDE138'),
          job: this.$t('ABCDE139'),
          hobby: this.$t('ABCDE140'),
          combineCell1: this.$t('ABCDE141'),
          combineCell2: this.$t('ABCDE142'),
          combineCell3: this.$t('ABCDE146'),
          address: this.$t('ABCDE144'),
          address1: this.$t('ABCDE145'),
          address2: this.$t('ABCDE145'),
          age: '18',
          gender: 'female',
        },
        {
          date: '2016-05-02',
          name: this.$t('ABCDE138'),
          job: this.$t('ABCDE139'),
          hobby: this.$t('ABCDE140'),
          combineCell1: this.$t('ABCDE147'),
          combineCell2: this.$t('ABCDE148'),
          combineCell3: this.$t('ABCDE143'),
          address: this.$t('ABCDE144'),
          address1: this.$t('ABCDE145'),
          address2: this.$t('ABCDE145'),
          age: '18',
          gender: 'female',
        },
        {
          date: '2016-05-02',
          name: this.$t('ABCDE138'),
          job: this.$t('ABCDE139'),
          hobby: this.$t('ABCDE140'),
          combineCell1: this.$t('ABCDE147'),
          combineCell2: this.$t('ABCDE149'),
          combineCell3: this.$t('ABCDE143'),
          address: this.$t('ABCDE144'),
          address1: this.$t('ABCDE145'),
          address2: this.$t('ABCDE145'),
          age: '18',
          gender: 'female',
        },
        {
          date: '2016-05-02',
          name: this.$t('ABCDE138'),
          job: this.$t('ABCDE139'),
          hobby: this.$t('ABCDE140'),
          combineCell1: this.$t('ABCDE147'),
          combineCell2: this.$t('ABCDE149'),
          combineCell3: this.$t('ABCDE143'),
          address: this.$t('ABCDE144'),
          address1: this.$t('ABCDE145'),
          address2: this.$t('ABCDE145'),
          age: '18',
          gender: 'female',
        },
        {
          date: '2016-05-04',
          name: this.$t('ABCDE138'),
          job: this.$t('ABCDE139'),
          hobby: this.$t('ABCDE140'),
          combineCell1: this.$t('ABCDE150'),
          combineCell2: this.$t('ABCDE151'),
          combineCell3: this.$t('ABCDE152'),
          address: this.$t('ABCDE153'),
          address1: this.$t('ABCDE145'),
          address2: this.$t('ABCDE145'),
          age: '18',
          gender: 'female',
        },
        {
          date: '2016-05-01',
          name: this.$t('ABCDE138'),
          job: this.$t('ABCDE139'),
          hobby: this.$t('ABCDE140'),
          combineCell1: this.$t('ABCDE150'),
          combineCell2: this.$t('ABCDE151'),
          combineCell3: this.$t('ABCDE143'),
          address: this.$t('ABCDE145'),
          address1: this.$t('ABCDE145'),
          address2: this.$t('ABCDE145'),
          age: '18',
          gender: 'female',
        },
        {
          date: '2016-05-03',
          name: this.$t('ABCDE154'),
          job: this.$t('ABCDE139'),
          hobby: this.$t('ABCDE140'),
          combineCell1: this.$t('ABCDE150'),
          combineCell2: this.$t('ABCDE155'),
          combineCell3: this.$t('ABCDE143'),
          address: this.$t('ABCDE156'),
          address1: this.$t('ABCDE145'),
          address2: this.$t('ABCDE145'),
          age: '18',
          gender: 'female',
        },
        {
          date: '2016-05-03',
          name: this.$t('ABCDE154'),
          job: this.$t('ABCDE139'),
          hobby: this.$t('ABCDE140'),
          combineCell1: this.$t('ABCDE157'),
          combineCell2: this.$t('ABCDE155'),
          combineCell3: this.$t('ABCDE146'),
          address: this.$t('ABCDE156'),
          address1: this.$t('ABCDE145'),
          address2: this.$t('ABCDE145'),
          age: '18',
          gender: 'female',
        },
      ],
      spanList1: [],
      spanList2: [],
      spanList3: [],
      spanList4: [],
    };
  },
  created() {
    this.getSpanList();
    this.$message(this.$t('ABCDE158') + this.show, window.a);
    this.$message(`${$t('ABCDE158')}${this.show}`, window.a);
    if (false) {
      console.error(this.$t('ABCDE158'), window.a);
      console.error(this.$t('ABCDE158'));
    }
  },
  methods: {
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 && this.spanList1[rowIndex]) {
        return {
          rowspan: Number(this.spanList1[rowIndex]),
          colspan: 1,
        };
      } else if (columnIndex == 1 && this.spanList2[rowIndex]) {
        return {
          rowspan: Number(this.spanList2[rowIndex]),
          colspan: 1,
        };
      } else if (columnIndex == 2 && this.spanList3[rowIndex]) {
        return {
          rowspan: Number(this.spanList3[rowIndex]),
          colspan: 1,
        };
      } else if (columnIndex == 7 && this.spanList4[rowIndex]) {
        return {
          rowspan: Number(this.spanList4[rowIndex]),
          colspan: 1,
        };
      } else if (columnIndex >= 3 && columnIndex != 7) {
        return {
          rowspan: 1,
          colspan: 1,
        };
      } else {
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },
    getSpanList() {
      for (let rowIndex in this.tableData) {
        //console.log(Number(rowIndex)+1>=this.tableData.length)
        if (
          rowIndex == 0 ||
          this.tableData[rowIndex].combineCell1 !=
            this.tableData[rowIndex - 1].combineCell1
        ) {
          this.spanList1.push(rowIndex);
          this.spanList2.push(rowIndex);
          this.spanList3.push(rowIndex);
          // this.spanList4.push(rowIndex)
        } else if (
          this.tableData[rowIndex].combineCell2 !=
          this.tableData[rowIndex - 1].combineCell2
        ) {
          this.spanList2.push(rowIndex);
          this.spanList3.push(rowIndex);
        } else if (
          this.tableData[rowIndex].combineCell3 !=
          this.tableData[rowIndex - 1].combineCell3
        ) {
          this.spanList3.push(rowIndex);
        }
        if (
          rowIndex == 0 ||
          this.tableData[rowIndex].name != this.tableData[rowIndex - 1].name
        ) {
          // address: this.$t('ABCDE156'),
          //     address1: this.$t('ABCDE145'),
          //     address2: this.$t('ABCDE145'),
          this.spanList4.push(rowIndex);
        }
        if (Number(rowIndex) + 1 >= this.tableData.length) {
          //console.log(rowIndex,Number(rowIndex)+1)
          this.spanList1.push(Number(rowIndex) + 1);
          this.spanList2.push(Number(rowIndex) + 1);
          this.spanList3.push(Number(rowIndex) + 1);
          this.spanList4.push(Number(rowIndex) + 1);
        }
      }
      function transferArrToObj(arr) {
        var obj = {};
        // debugger
        for (let i in arr) {
          if (arr[Number(i) + 1]) {
            obj[arr[i]] = Number(arr[Number(i) + 1]) - Number(arr[i]);
          }
        }
        //console.log(obj)
        return obj;
      }

      this.spanList1 = transferArrToObj(this.spanList1);
      this.spanList2 = transferArrToObj(this.spanList2);
      this.spanList3 = transferArrToObj(this.spanList3);
      this.spanList4 = transferArrToObj(this.spanList4);

      // return {
      //     rowspan: 0,
      //     colspan: 0
      // };
    },
    handleClick() {
      this.show = !this.show;
    },
    getHeaderCellStyle({ row, column, rowIndex, columnIndex }) {
      //获得标题，这里需要在上面设置prop属性
    },
    getCellClassName({ row, column, rowIndex, columnIndex }) {
      //获得标题，这里需要在上面设置prop属性
      return ' _headerName_' + column.property + ' ';
    },
  },
};
</script>
