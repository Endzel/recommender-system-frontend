<template>
    <transition name="fade">
        <b-alert
            v-if="dismiss_count_down"
            :show="dismiss_count_down"
            :variant="type"
            @dismissed="dismiss_count_down = 0"
            @dismiss-count-down="countDownChanged">
            {{ this.message }}
        </b-alert>
    </transition>
</template>

<script>
    export default {
        name: 'AlertElement',
        props: {
            type: {
                type: String,
                required: false,
                default: 'info'
            },
            message: {
                type: String,
                required: true,
            },
        },
        data () {
            return {
                dismiss_count_down: 4,
            }
        },
        methods: {
            clicked() {
                this.dismiss_count_down = 0
                this.$emit('click')
                if (this.to != undefined && !this.external) {
                    this.$router.push(this.to)
                }
            },
            countDownChanged (dismiss_count_down) {
                this.dismiss_count_down = dismiss_count_down
                if (this.dismiss_count_down === 0) {
                    this.$store.dispatch('setAlert', { show: false, })
                }
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @use '@/assets/css/global.scss' as *;

    .alert {
        font-size: 16;
        font-weight: 1000;
        position: fixed;
        top: 200px;
        left: 35%;
        z-index: 9999;
        width: 30%;
        text-align: center;
        border-radius: 20px;
        &-info {
            background-color: $yellow;
            border-color: $white;
            color: $black;
        }
        &-success {
            background-color: $green;
            border-color: $white;
            color: $white;
        }
        &-error {
            background-color: $red;
            border-color: $white;
            color: $white;
        }
    }


    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }


</style>
