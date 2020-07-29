<template>
  <el-select
          v-model="value"
          placeholder="请选择"
          filterable
          multiple
          v-el-select-loadmore="loadmore"
  >
    <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
    /* eslint-disable */
    export default {
        directives: {
            'el-select-loadmore': {
                bind(el, binding) {
                    // 获取element-ui定义好的scroll盒子
                    const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
                    SELECTWRAP_DOM.addEventListener('scroll', function () {
                        /**
                         * scrollHeight 获取元素内容高度(只读)
                         * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                         * clientHeight 读取元素的可见高度(只读)
                         * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                         * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                         */
                        debugger
                        const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
                        if (!condition) {
                            binding.value();
                        }
                    });
                },
                // bind1(el,binding){
                //     const SELECTWRAP_DOM1 = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
                //     SELECTWRAP_DOM1.addEventListener('scroll',function () {
                //         const condition1 = this.scrollHeight = this.scrollTop<=this.clientHeight
                //         if(condition1){
                //             binding.value
                //         }
                //     })
                // }
            }
        },
        data() {
            return {
                value: '',
                options: [],
                formData: {
                    pageIndex: 1,
                    pageSize: 20,
                }
            };
        },
        created() {
            this.getList(this.formData);
        },
        mounted(){
            document.querySelector(".el-select-dropdown .el-scrollbar__wrap").style.height = 120 +'px'
        },
        methods: {
            loadmore() {
                this.formData.pageIndex++;
                this.getList(this.formData);
            },
            getList(formData) {
// 这里是接口请求数据, 带分页条件
                const _res = [{
                    id:1+Math.random(),lable:1
                },
                    {
                        id:2+Math.random(),lable:2
                    },
                    {
                        id:3+Math.random(),lable:3}
                    ]; // 请求得到的数据
                this.options = [...this.options, ..._res];
            }
        }
    };

</script>