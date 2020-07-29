
<!--<template>-->
    <!--<my-test>-->
        <!--<template slot-scope="scope123456">返回来自test内部子组件的{{scope123456}}</template>-->
    <!--</my-test>-->
<!--</template>-->

<!--<script>-->
    <!--import MyTest from "./App3"-->
    <!--export default {-->
        <!--components:{MyTest}-->
    <!--}-->
<!--</script>-->
<template>
    <div class="content">
        <span>{{ $t('lang.home')}}</span>
        <span>{{ $t('lang.name')}}</span>
        <router-view></router-view>
        <span @click="changeLaguages()">切换语言</span>
        <!-- <span v-if="lang==='zh'"  @click="changezh" style="display:block" class="color">中文</span> -->
        <!-- <span v-else ="lang==='en'" @click="changeen" style="display:block">english</span> -->
    </div>
</template>

<script>
    // import APP2 from
    export default {
        data () {
            return {
                lang: 'zh'
            }
        },
        methods: {
            changeLaguages () {
                console.log(this.$i18n.locale)
                let lang = this.$i18n.locale === 'zh' ? 'en' : 'zh'
                this.$i18n.locale = lang
            }
            // changezh () {
            //   this.lang = '中文'
            //   this.$i18n.locale = 'zh'
            // },
            // changeen () {
            //   this.lang = 'english'
            //   this.$i18n.locale = 'en'
            // }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style scoped lang="scss">-->
    <!--/*@import '@/assets/scss/index.scss';*/-->
<!--</style>-->