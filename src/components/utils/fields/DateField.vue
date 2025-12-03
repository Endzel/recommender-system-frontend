<template>
    <div class="div-date">
        <b-row>
            <b-col><datepicker v-model="value" format="yyyy-MM-dd" @update:model-value="updateValue" :enable-time-picker="false"></datepicker></b-col>
            <b-col><i class="fa fa-calendar" aria-hidden="true"/></b-col>
        </b-row>
    </div>
</template>

<script>
    import { VueDatePicker } from '@vuepic/vue-datepicker'
    import '@vuepic/vue-datepicker/dist/main.css'

    export default {
        name: 'DateField',
        components: { 'datepicker': VueDatePicker, },
        props: {},
        data () {
            return {
                value: null,
            }
        },
        methods: {
            updateValue(value) {
                this.value = value
                if (value !== null && value !== undefined){
                     this.$emit('update:modelValue', value.toISOString().split('T')[0])
                }
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
        min-height: 40px;
        .vdp-datepicker {
            width: 100%;
            font-size: $small;
            background-color: $white;
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

    .vdp-datepicker input {
        border-radius: 5px!important;
        border: 1px solid!important;
    }

</style>
