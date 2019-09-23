<template>
    <div class="div-text-area">
        <div class="d-flex field-header">
            <div v-if="label !== null" class="label"><span>{{ label }}</span></div>
        </div>
        <textarea
            class="input"
            :value="this.value"
            :placeholder="placeholder"
            :rows="rows"
            :max-rows="maxRows"
            @input="updateValue($event.target.value)">
        </textarea>
    </div>
</template>

<script>
    export default {
        name: 'TextAreaField',
        props: {
            placeholder: {
                type: String,
                required: false,
                default: '',
            },
            label: {
                type: String,
                required: false,
                default: null,
            },
            rows: {
                type: Number,
                required: false,
                default: 3
            },
            initialValue: {
                required: false,
                default: ''
            },
            'max-rows': {
                type: Number,
                required: false,
                default: 6
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
                this.$emit('update', value)
            },
        },
        created: function() {
            this.value = this.initialValue
        },
    }
</script>

<style lang="scss" scoped>
    @import 'src/assets/css/global.scss';

    .div-text-area {
        width: 100%;
        margin-bottom: 10px;
        min-height: 70px;
        .field-header {
            margin-bottom: 10px;
            .label {
                text-align: left;
                font-size: $medium;
                color: $black;
                font-weight: bold;
            }
        }
        .input {
            width: 100%;
            min-height: 90px;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 5px;
            border: solid 1px $grey;
            font-size: $small;
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
