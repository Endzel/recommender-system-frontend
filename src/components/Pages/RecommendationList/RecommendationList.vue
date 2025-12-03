<template>
    <div class="d-flex align-items-center">
        <b-container>
            <b-row cols="4" class="header-infos">
                <b-col><valoration-card v-if="this.ready" :initialValue="this.valoration" color="yellow" title="Valoración:" @update="setValoration"></valoration-card></b-col>
                <b-col>
                    <span class="subtitle">Recomendación para {{this.infos.city.name}}</span>
                    <span>Compañeros de viaje: {{ this.company }} </span>
                    <tag class="save-btn" @click="saveRecommendation()" :value="'Guardar recomendación'" color="green"/>
                </b-col>
                <b-col>
                    <b-row>
                        <b-col>
                            <span>Desde: {{this.infos.start_date}}</span>
                            <tag class="place-tag" :value="this.infos.city.name" color="blue"/>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <span>Hasta: {{this.infos.end_date}}</span>
                            <tag class="place-tag" :value="this.infos.city.country" color="grey"/>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row v-for="(item, index) in items" :key="item.id">
                <item-card :data="item"/>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'RecommendationList',
        component: {},
        data () {
            return {
                infos: {
                    valoration: {
                        score: 0
                    },
                    city: {}
                },
                items: [],
                valoration: 0,
                ready: false,
                company: ""
            }
        },
        methods: {
            getRecommendation() {
                this.apiGet('recommendations/' + this.$route.params.id).then(response => {
                    this.items = response.data.items
                    this.infos = response.data
                    if (!this.isEmpty(response.data.valoration)) {
                        this.valoration = response.data.valoration.score
                    }
                    let company = ""
                    this.infos.group.users.forEach(function(e) {
                        company = company + e.first_name + " " + e.last_name + ", "
                    })
                    this.company = company.substring(0, company.length - 2);
                    this.ready = true
                }, response => {});
            },
            saveRecommendation() {
                let params = {}
                params["recommendation"] = this.$route.params.id
                params["score"] = this.valoration
                params["user"] = this.$store.state.user
                if (this.isEmpty(this.infos.valoration)) {
                    this.apiPost('valorations', params).then(response => {
                        this.valoration = response.data.score
                        this.$store.dispatch('setAlert', { show: true, type: 'success', message: 'Valoración creada correctamente 😊'})
                    }, response => {
                        this.$store.dispatch('setAlert', { show: true, type: 'error', message: 'No fue posible guardar tu valoración 😥'})
                    });
                } else {
                    this.apiPatch('valorations/' + this.infos.valoration.id, params).then(response => {
                        this.valoration = response.data.score
                        this.$store.dispatch('setAlert', { show: true, type: 'success', message: 'Valoración guardada correctamente 😊'})
                    }, response => {
                        this.$store.dispatch('setAlert', { show: true, type: 'error', message: 'No fue posible guardar tu valoración 😥'})
                    });
                }
            },
            setValoration(value) {
                this.valoration = value
            },
        },
        created: function() {
            this.getRecommendation()
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @use '@/assets/css/global.scss' as *;

    @media (min-width: 1600px){
        .container {
            max-width: 1200px;
        }
    }

    .header-infos {
        text-align: center;
        margin-bottom: 10px;
        align-items: center;
        justify-content: center;
        div {
            .card {
                min-width: 0;
            }
        }
        .subtitle {
            font-size: 24px;
            margin-bottom: 10px;
            font-weight: 500;
        }
        .save-btn {
            margin-top: 20px;
            margin-left: 25%;
            cursor: pointer;
        }
        .place-tag {
            margin: 10px;
            margin-left: 25%;
        }
    }

</style>
