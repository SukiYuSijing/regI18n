<template>
    <div class="content">
        <span>{{ $t('lang.home')}}</span>
        <span>{{ $t('lang.name')}}</span>
        <span @click="changeLaguages()">切换语言</span>
        <!-- <span v-if="lang==='zh'"  @click="changezh" style="display:block" class="color">中文</span> -->
        <!-- <span v-else ="lang==='en'" @click="changeen" style="display:block">english</span> -->
    </div>
</template>

<script>
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