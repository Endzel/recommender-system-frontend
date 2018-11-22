<template>
    <div class="div-select">
        <div class="d-flex field-header">
            <div v-if="label !== null" class="label"><span>{{ label }}</span></div>
        </div>
        <b-form-select :v-model="value" :value="value" class="select" @input="updateValue">
            <option disabled value="">Select one</option>
            <option v-for="(option, index) in options" :key="index" :value="option.key">{{ option.text }}</option>
        </b-form-select>
    </div>
</template>

<script>

    export default {
        name: 'SelectField',
        props: {
            initialValue: {
                required: false,
                default: ''
            },
            label: {
                type: String,
                required: false,
                default: null,
            },
            options: {
                required: false,
            },
        },
        data () {
            return {
                value: '',
            }
        },
        methods: {
            updateValue(value) {
                this.value = value
            },
        },
        created: function() {
            for (let option in this.options) {
                if (this.options[option].text === this.initialValue) {
                    this.value = this.options[option].key
                    break
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import 'src/assets/css/global.scss';

    .div-select {
        width: 100%;
        margin-bottom: 10px;
        min-height: 70px;
        .field-header {
            margin-bottom: 10px;
            .label {
                text-align: left;
                font-size: $slarge;
                color: $black;
                font-weight: bold;
            }
        }
        .label {
            text-align: left;
            font-size: $slarge;
            margin-bottom: 5px;
        }
        .select {
            min-height: 35px !important;
            border: 1px solid $grey;
            &:focus, &:active {
                box-shadow: 0 0 3px 2px $grey;
            }
        }
    }

</style>
