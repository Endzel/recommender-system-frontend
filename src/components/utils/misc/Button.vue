<template>
    <b-btn :class="'button ' + 'button-' + size + ' button-' + color" @click="clicked"><slot></slot></b-btn>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            color: {
                type: String,
                required: false,
                default: 'white'
            },
            size: {
                type: String,
                required: false,
                default: 'auto'
            },
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

    .button {
        cursor: pointer;
        border-radius: 5px;
        color: $white !important;
        height: 35px;
        font: $main-font;
        align-items: flex-start;
        vertical-align: middle;
        transition: background .3s ease, color .3s ease;
        border: none;
        @media (max-width: 767px) {
            font-size: $small;
        }
        padding-top: 0px !important;
        padding-bottom: 0px !important;
        &-biggest {
            width: 100%;
        }
        &-big {
            width: 75%;
        }
        &-medium {
            width: 50%;
        }
        &-small {
            width: 25%;
        }
        &-auto {
            width: auto;
        }
    }

    .button-white {
        background-color: $white !important;
        &:hover, &:focus, &:active {
            background-color: $grey !important;
        }
    }

    .button-green {
        background-color: $green !important;
        &:hover, &:focus, &:active {
            background-color: $white !important;
            color: $green !important;
        }
    }

</style>
