<template>
    <div :class="'tag-label ' + ' tag-label-' + color + ' size-' + size" v-on:click="clicked">
        <span>{{ this.value }}</span>
    </div>
</template>

<script>
    export default {
        name: 'Tag',
        props: {
            color: {
                type: String,
                required: false,
                default: 'yellow'
            },
            value: {
                type: String,
                required: false,
                default: ''
            },
            size: {
                type: String,
                required: false,
                default: 'normal'
            },
        },
        methods: {
            clicked() {
                this.$emit('click')
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import 'src/assets/css/global.scss';

    .tag-label {
        text-align: center;
        padding: 5px;
        margin-bottom: 5px;
        width: auto;
        max-width: 200px;
        color: $white;
        border-radius: 8px;
    }

    .size-big {
        font-size: 30px;
        font-weight: bold;
    }

    .tag-label-grey {
        background-color: $grey;
        color: $black;
        border: solid 1px $grey;
    }

    .tag-label-red {
        background-color: $red;
        color: $black;
        border: solid 1px $red;
    }

    .tag-label-orange {
        background-color: $orange;
        color: $black;
        border: solid 1px $orange;
    }

    .tag-label-green {
        background-color: $green;
        color: $black;
        border: solid 1px $green;
    }

    .tag-label-blue {
        background-color: $blue;
        color: $black;
        border: solid 1px $blue;
    }

    .tag-label-yellow {
        background-color: $yellow;
        color: $black;
        border: solid 1px $yellow;
    }

    .tag-label-black {
        color: $black;
        border: solid 1px $black;
    }

    .tag-label-green:hover{
        background-color: $green;
        color: $white;
    }

    .tag-label-red:hover{
        background-color: $red;
        color: $white;
    }

    .tag-label-orange:hover{
        background-color: $orange;
        color: $white;
    }

    .tag-label-yellow:hover{
        background-color: $yellow;
        color: $white;
    }

    .tag-label-blue:hover{
        background-color: $blue;
        color: $white;
    }

    .tag-label-grey:hover{
        background-color: $grey;
        color: $white;
    }

    .tag-label-black:hover{
        background-color: $black;
        color: $white;
    }

</style>
