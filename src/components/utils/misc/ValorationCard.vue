<template>
    <b-container :class="'card ' + ' card-' + color">
        <b-row>
            <b-col>
                <span class="title">{{ title }}</span>
            </b-col>
            <b-col class="star-rating-col">
                <star-rating v-model="rating" :increment="1" :max-rating="10" inactive-color="#fff" active-color="#ff0" :star-size="20" :show-rating="true" @rating-selected="setValue(rating)"></star-rating>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import starRating from 'vue3-star-ratings'

    export default {
        name: 'ValorationCard',
        components: { 'star-rating' : starRating },
        props: {
            color: {
                type: String,
                required: false,
                default: 'white'
            },
            title: {
                type: String,
                required: false,
                default: ''
            },
            initialValue: {
                required: false,
                default: 0
            },
        },
        data () {
            return {
                values_list: {
                    1 : 0.1,
                    2 : 0.2,
                    3 : 0.3,
                    4 : 0.4,
                    5 : 0.5,
                    6 : 0.6,
                    7 : 0.7,
                    8 : 0.8,
                    9 : 0.9,
                    10 : 1
                },
                rating: 0,
            }
        },
        methods: {
            clicked() {
                this.$emit('click')
            },
            setValue(index) {
                this.$emit('update', this.values_list[index])
            }
        },
        created: function() {
            this.rating = this.initialValue * 10
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import 'src/assets/css/global.scss';

    .card {
        border-radius: 5px;
        min-height: 100px;
        width: auto;
        min-width: 500px;
        justify-content: center;
        align-items: center;
        font: $main-font;
        vertical-align: middle;
        transition: background .3s ease, color .3s ease;
        @media (max-width: 767px) {
            font-size: $small;
        }
        .star-rating-col {
            margin:auto;
        }
    }

    .card-grey {
        background-color: $grey !important;
        &:hover, &:focus, &:active {
            background-color: rgba($grey, 0.5) !important;
        }
    }

    .card-green {
        background-color: $green !important;
        &:hover, &:focus, &:active {
            background-color: $white !important;
            color: $green !important;
        }
    }

    .card-yellow {
        background-color: $yellow !important;
        &:hover, &:focus, &:active {
            background-color: $white !important;
            color: $yellow !important;
        }
    }

    .card-red {
        background-color: $red !important;
        &:hover, &:focus, &:active {
            background-color: $white !important;
            color: $red !important;
        }
    }

    .card-blue {
        background-color: $blue !important;
        &:hover, &:focus, &:active {
            background-color: $white !important;
            color: $blue !important;
        }
    }

</style>
