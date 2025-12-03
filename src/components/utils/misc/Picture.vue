<template>
        <b-img :src="this.src" :class="this.type" :fluid="fluid" :width="width" :height="height"/>
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
            type: {
                type: String,
                required: false,
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @use '@/assets/css/global.scss' as *;
</style>
