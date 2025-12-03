<template>
    <b-container v-if="ready" :class="'card ' + ' card-' + setColor">
        <b-row>
            <b-col>
                <span class="title">{{ this.data.domain }}</span>
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
        name: 'PreferenceCard',
        components: { 'star-rating' : starRating },
        props: {
            data: {
                type: Object,
                required: true,
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
                user_context: {},
                rating: 0,
                color: "grey",
                ready: false,
            }
        },
        computed: {
            setColor() {
                if (this.user_context.weight > 0 && this.user_context.weight < 0.4) {
                    return "red"
                } else if (this.user_context.weight >= 0.4 && this.user_context.weight < 0.7) {
                    return "yellow"
                } else if (this.user_context.weight >= 0.7) {
                    return "green"
                } else {
                    return "grey"
                }
            }
        },
        methods: {
            clicked() {
                this.$emit('click')
            },
            getUserContext(index) {
                this.apiGet('user_contexts?context=' + this.data.id).then(response => {
                    if (!this.isEmpty(response.data)) {
                        this.user_context = response.data[0]
                        this.rating = this.user_context.weight * 10
                    }
                    this.ready = true
                }, response => {});
            },
            setValue(index) {
                let params = {}
                params['weight'] = this.values_list[index]
                params['context_segment'] = this.data.id
                params['user'] = this.$store.state.user
                if (this.isEmpty(this.user_context)) {
                    this.apiPost('user_contexts', params).then(response => {
                        this.user_context = response.data
                        this.$store.dispatch('setAlert', { show: true, type: 'success', message: 'Preferencia creada correctamente 😊'})
                    }, response => {
                        this.$store.dispatch('setAlert', { show: true, type: 'error', message: 'No fue posible guardar tu preferencia 😥'})
                    });
                } else {
                    this.apiPatch('user_contexts/' + this.user_context.id, params).then(response => {
                        this.user_context = response.data
                        this.$store.dispatch('setAlert', { show: true, type: 'success', message: 'Preferencia guardada correctamente 😊'})
                    }, response => {
                        this.$store.dispatch('setAlert', { show: true, type: 'error', message: 'No fue posible guardar tu preferencia 😥'})
                    });
                }
            },
        },
        created: function() {
            this.getUserContext();
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
