<template>
    <b-container class="main-container">
        <b-row>
            <b-col><h1>Permitidme ayudaros a planificar vuestro viaje</h1></b-col>
        </b-row>
        <b-row class="field-group">
            <b-col><p>¿Dónde vas?</p></b-col>
            <b-col><select-field v-model="city" :options="this.cities"  @input="updateCity"/></b-col>
        </b-row>
        <b-row class="field-group">
            <b-col><p>Fecha ida</p></b-col>
            <b-col><date-field @input="updateStartDate"/></i></b-col>
        </b-row>
        <b-row class="field-group">
            <b-col><p>Fecha vuelta</p></b-col>
            <b-col><date-field @input="updateEndDate"/></b-col>
        </b-row>
        <b-row class="field-group">
            <b-col><p>¿Con quién?</p></b-col>
            <b-col>
                <multiselect :searchable="false" v-model="friends" :options="this.users" :multiple="true" :close-on-select="false" :clear-on-select="false" label="text" placeholder="Amigos" track-by="text" @input="updateFriends"/>
            </b-col>
        </b-row>
        <b-row class="field-group">
            <b-col><p>Contexto y nivel</p></b-col>
            <b-col><select-field v-model="context" :options="this.contexts" @input="updateContext"/></b-col>
        </b-row>
        <b-row v-if="context !== 0">
            <b-col><card color="grey" :title="context_text" @update="updateContextValue"></card></b-col>
        </b-row>
        <b-row>
            <b-col><btn class="btn-recommender" color="orange" size="biggest" @click="requestRecommendation()">Solicitar recomendaciones</btn></b-col>
        </b-row>
        <b-row>
            <b-col><span class="feedback">{{ this.feedback }}</span></b-col>
        </b-row>
    </b-container>
</template>

<script>
    import Multiselect from 'vue-multiselect'

    export default {
        name: 'Home',
        components: {'multiselect': Multiselect},
        props: {},
        data () {
            return {
                cities: [
                    {key: 1, text: 'Barcelona'},
                    {key: 2, text: 'Madrid'},
                    {key: 3, text: 'Málaga'},
                    {key: 4, text: 'Londres'},
                    {key: 5, text: 'Praga'},
                    {key: 6, text: 'Wroclaw'},
                    {key: 7, text: 'París'},
                ],
                users: [
                    {key: 1, text: 'Carlos Fernández'},
                    {key: 2, text: 'Alfred N\'Diaye'},
                    {key: 3, text: 'Tomeu Nadal'},
                    {key: 4, text: 'Quique González'},
                    {key: 5, text: 'Stuani'},
                    {key: 6, text: 'Salva Sevilla'},
                    {key: 7, text: 'Ángel Montoro'},
                ],
                contexts: [
                    {key: 1, text: 'Relax'},
                    {key: 2, text: 'Naturaleza'},
                    {key: 3, text: 'Centricidad'},
                    {key: 4, text: 'Familiar'},
                    {key: 5, text: 'Laboral'},
                    {key: 6, text: 'Ocio musical'},
                    {key: 7, text: 'Actividad deportiva'},
                ],
                search: {
                    city: '',
                    start_date: '',
                    end_date: '',
                    context: {
                        context_segment: 0,
                        weight: 0,
                    },
                    users: [],
                },
                context: 0,
                city: 0,
                context_text: '',
                friends: [],
                feedback: '',
            }
        },
        methods: {
            updateCity(value) {
                this.search.city = value
            },
            updateStartDate(value) {
                this.search.start_date = value
            },
            updateEndDate(value) {
                this.search.end_date = value
            },
            updateFriends(value) {
                this.search.users = value.map(a => a.key);
            },
            updateContext(value) {
                this.context_text = this.contexts.find(function(o){ return o.key===value }).text
                this.search.context.context_segment = value
            },
            updateContextValue(value) {
                this.search.context.weight = value
            },
            requestRecommendation(){
                if (this.search.city !== '' && this.search.start_date !== '' && this.search.end_date !== '' && this.search.context.context_segment !== 0 && this.search.context.value !== 0 && !this.isEmpty(this.search.users)) {
                    this.search.users.push(this.$store.state.user)
                    this.apiPost('groups', {'users' : this.search.users}).then(response => {
                        this.search.group = response.data.id
                        this.search.context.user = this.$store.state.user
                        this.apiPost('user_contexts', this.search.context).then(response => {
                            this.search.context_segments = [this.search.context.context_segment]
                            delete this.search.context
                            delete this.search.users
                            this.apiPost('recommendations', this.search).then(response => {
                                this.$router.push({ name: 'RecommendationList', id: response.data.id})
                            }, response => {
                                this.feedback = "La recomendación no pudo ser creada correctamente";
                            });
                        }, response => {
                            this.feedback = "El contexto no pudo ser creado correctamente";
                        });
                    }, response => {
                        this.feedback = "El grupo no pudo ser creado correctamente";
                    });
                } else {
                    this.feedback = "Por favor, rellena todos los datos"
                }
            },
            getCityChoices() {
                this.apiGet('cities/choices').then(response => {
                    this.cities = response.data;
                }, error => {
                    return []
                });
            },
            getUserChoices() {
                this.apiGet('users/choices').then(response => {
                    this.users = response.data.filter(e => e.key !== this.$store.state.user)
                }, error => {
                    this.users = []
                });
            },
            getContextChoices() {
                this.apiGet('context_segments/choices').then(response => {
                    this.contexts = response.data;
                }, error => {
                    this.contexts = []
                });
            },
            getSelects() {
                this.getCityChoices()
                this.getUserChoices()
                this.getContextChoices()
            }
        },
        created: function() {
            this.getSelects();
        },
        beforeCreate: function() {
            document.title = "Sistema de recomendación turístico grupal"
        },
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>

    @import 'src/assets/css/global.scss';

    .main-container {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        margin:auto;
    }
    .btn-recommender {
        margin-top: 32px;
        min-width: 400px;
    }
    .card {
        min-width: 40%;
    }

</style>
