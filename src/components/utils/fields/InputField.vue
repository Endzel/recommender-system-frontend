<template>
    <div class="div-input">
        <div class="d-flex field-header">
            <div v-if="label !== null" class="label"><span>{{ label }}</span></div>
        </div>
        <div>
            <span class="icon" v-if="icon"><slot name="icon" v-if="icon"></slot></span>
            <input v-if="!disabled"
                class="input"
                :type="type"
                :placeholder="placeholder"
                :value="value"
                @input="updateValue($event.target.value)">
                <slot name="input-text"></slot>
            </input>
            <input :type="type" v-if="disabled" disabled class="input input-disabled" :value="value"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InputField',
        props: {
            type: {
                type: String,
                required: false,
                default: 'text'
            },
            placeholder: {
                type: String,
                required: false,
                default: '',
            },
            icon: {
                type: Boolean,
                required: false,
                default: false,
            },
            label: {
                type: String,
                required: false,
                default: null,
            },
            initialValue: {
                required: false,
                default: ''
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false,
            }
        },
        data () {
            return {
                value: null,
            }
        },
        watch: {
            disabled(new_val) {
                this.disabled = new_val
            },
        },
        methods: {
            updateValue(value) {
                this.value = value
            },
        },
        created: function() {
            this.value = this.initialValue
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import 'src/assets/css/global.scss';

    .div-input {
        width: 100%;
        min-height: 70px;
        margin-bottom: 10px;
        .field-header {
            margin-bottom: 10px;
            .label {
                text-align: left;
                font-size: $slarge;
                color: $black;
                font-weight: bold;
            }
        }
        .input {
            width: 100%;
            padding-left: 10px;
            padding-right: 10px;
            width: 100%;
            height: 35px;
            border-radius: 3.5px;
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
        .input-disabled {
            background-color: $grey !important;
            color: $white !important;
        }
    }

</style>
