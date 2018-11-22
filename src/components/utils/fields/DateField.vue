<template>
    <div class="div-date">
        <div class="d-flex field-header">
            <div v-if="label !== null" class="label"><span>{{ label }}</span></div>
        </div>
        <datepicker value="value" v-model="value" format="yyyy-MM-dd" @input="updateValue"></datepicker>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker'

    export default {
        name: 'DateField',
        components: { 'datepicker': Datepicker, },
        props: {
            label: {
                type: String,
                required: false,
                default: null,
            },
        },
        data () {
            return {
                value: null,
            }
        },
        methods: {
            updateValue(value) {
                this.value = value
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import 'src/assets/css/global.scss';

    .div-date {
        width: 100%;
        margin-bottom: 10px;
        min-height: 70px;
        .field-header {
            margin-bottom: 10px;
            .label {
                text-align: left;
                font-size: $large;
                color: $black;
                font-weight: bold;
            }
        }
        .input {
            width: 100%;
            padding-left: 10px;
            padding-right: 10px;
            width: 100%;
            border-radius: 5px;
            border: solid 1px $grey;
            font-size: $medium;
            background-color: $white;
            outline: none;
            transition: box-shadow .3s ease, border .3s ease, color .3s ease;
            &:hover {
                color: $black;
            }
            &:focus, &:active {
                color: $black;
                box-shadow: 0 0 3px 2px $grey;
            }
        }
    }

</style>
