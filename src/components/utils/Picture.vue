<template>
        <b-img :src="this.image_src" :class="this.type" :fluid="fluid" :width="width" :height="height"/>
</template>

<script>
    export default {
        name: 'Picture',
        props: {
            src: {
                type: String,
                required: false,
            },
            fluid: {
                type: Boolean,
                required: false,
                default: true,
            },
            width: {
                type: String,
                required: false,
            },
            height: {
                type: String,
                required: false,
            },
        },
        data () {
            return {
                image_src: null,
            }
        },
        computed: {
        },
        methods: {
            clicked() {
                this.$emit('click')
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import 'src/assets/css/global.scss';
</style>
