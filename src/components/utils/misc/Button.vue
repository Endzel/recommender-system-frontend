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
    @use '@/assets/css/global.scss' as *;

    .button {
        cursor: pointer;
        padding: 8px;
        margin: 8px;
        border-radius: 8px;
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

    .button-orange {
        background-color: $orange !important;
        &:hover, &:focus, &:active {
            background-color: $white !important;
            color: $orange !important;
        }
    }

    .button-red {
        background-color: $red !important;
        &:hover, &:focus, &:active {
            background-color: $white !important;
            color: $red !important;
        }
    }

    .button-blue {
        background-color: $blue !important;
        &:hover, &:focus, &:active {
            background-color: $white !important;
            color: $blue !important;
        }
    }

</style>
