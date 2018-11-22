<template>
    <div class="div-checkbox d-flex align-items-center">
        <label class="label-checkbox d-flex align-items-center">
            <input class="box-checkbox" type="checkbox" value="checked" :checked="checked" @change="updateValue($event.target.value)" :disabled="disabled">
            <slot class="text"></slot>
        </label>
    </div>
</template>

<script>
    export default {
        name: 'Checkbox',
        props: {
            value: {
                required: false,
            },
            'pre-checked': {
                type: Boolean,
                required: false,
                default: false,
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false,
            }
        },
        data () {
            return {
                checked: this.value,
            }
        },
        watch: {
            disabled(new_val) {
                this.disabled = new_val
            }
        },
        methods: {
            updateValue(value) {
                this.checked = !this.checked
                this.$emit('input', this.checked)
            },
        },
        mounted: function () {
            if (this.preChecked) {
                this.checked = true
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    @import 'src/assets/css/global.scss';

    .div-checkbox {
        min-height: 70px;
        .label-checkbox {
            text-align: left;
            cursor: pointer;
            margin-bottom: 0px;
            .box-checkbox {
                width: auto;
                margin-right: 20px;
                text-align: left;
            }
            .disabled {
                background-color: rgba($grey, 1);
            }
        }
        .icon-link {
            height: 15px;
            width: 15px;
            margin-top: 3px;
            border-radius: 20%;
            padding: 4px;
            cursor: default;
            border: solid 1px rgba($grey, 0.6);
        }
        .accepted {
            background-color: rgba($green, 0.8);
        }
        .false {
            background-color: rgba($red, 0.8);
        }
    }

</style>
