<template>
    <b-container>
        <router-link :to="{ path: '/recommendations/' + data.id}">
            <b-row class="card">
                <b-col>
                    <b-row class="recommendation-row">
                        <b-col>
                            <span>Amigos de viaje: {{ company }}</span>
                        </b-col>
                        <b-col>
                            <tag size="big" class="float-right right-info" v-if="!this.isEmpty(data.valoration)" :valoration-color="data.valoration.score" :value="data.valoration.score*10"></tag>
                        </b-col>
                    </b-row>
                    <b-row class="recommendation-row">
                        <b-col class="mt-5">
                            <span>{{ data.start_date }} al {{ data.end_date }}</span>
                        </b-col>
                        <b-col class="mt-3">
                            <span class="title">{{ data.city.name }}</span>
                        </b-col>
                        <div>
                            <tag size="big" class="float-right right-info" color="orange" :value="data.city.country"/>
                        </div>
                    </b-row>
                </b-col>
            </b-row>
        </router-link>
    </b-container>
</template>

<script>
    export default {
        name: 'RecommendationCard',
        props: {
            data: {
                type: Object,
                required: true,
            },
        },
        data () {
            return {
                company: ""
            }
        },
        methods: {
            clicked() {
                this.$emit('click')
            },
        },
        created: function() {
            let company = ""
            this.data.group.users.forEach(function(e) {
                company = company + e.first_name + " " + e.last_name + ", "
            })
            this.company = company.substring(0, company.length - 2);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import 'src/assets/css/global.scss';

    a {
        color: $black;
        text-decoration: none;
    }

    .card {
        border-radius: 5px;
        height: 150px;
        width: 100%;
        min-width: 500px;
        background-color: rgba(0, 200, 0, 0.3);
        transition: background .3s ease, color .3s ease;
        .recommendation-row {
            height: 40%;
        }
        .right-info {
            width: 200px;
            height: 100%;
        }
    }

</style>
