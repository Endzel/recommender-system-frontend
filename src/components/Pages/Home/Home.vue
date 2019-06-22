<template>
    <b-container class="main-container">
        <b-row>
            <b-col><h1>Permitidme ayudaros a planificar vuestro viaje</h1></b-col>
        </b-row>
        <b-row class="field-group">
            <b-col><p>¿Dónde vas?</p></b-col>
            <b-col><select-field v-model="this.search.city" :initialValue="'Barcelona'" :options="this.cities"/></b-col>
        </b-row>
        <b-row class="field-group">
            <b-col><p>Fecha ida</p></b-col>
            <b-col><date-field v-model="this.search.start_date"/></i></b-col>
        </b-row>
        <b-row class="field-group">
            <b-col><p>Fecha vuelta</p></b-col>
            <b-col><date-field v-model="this.search.end_date"/></b-col>
        </b-row>
        <b-row class="field-group">
            <b-col><p>¿Con quién?</p></b-col>
            <b-col>
                <multiselect :searchable="false" v-model="friends" :options="this.users" :multiple="true" :close-on-select="false" :clear-on-select="false" label="text" placeholder="Amigos" track-by="text"/>
            </b-col>
        </b-row>
        <b-row class="field-group">
            <b-col><p>Contexto y nivel</p></b-col>
            <b-col><select-field v-model="context" :options="this.contexts" @input="updateContext"/></b-col>
        </b-row>
        <b-row v-if="context !== ''">
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
                        id: 0,
                        value: 0,
                    },
                    friends: [],
                },
                context: '',
                context_text: '',
                friends: [],
                feedback: '',
            }
        },
        methods: {
            updateFriends(value) {
                this.search.friends = value
            },
            updateContext(value) {
                this.context_text = this.contexts.find(function(o){ return o.key===value }).text
                this.search.context.id = value
            },
            updateContextValue(value) {
                this.search.context.value = value
            },
            requestRecommendation(){
                if (!this.isEmpty(this.search.city) && !this.isEmpty(this.search.start_date) && !this.isEmpty(this.search.end_date) && !this.isEmpty(this.search.context.id) && !this.isEmpty(this.search.context.value) && !this.isEmpty(this.search.friends)) {
                    this.apiPost('recommendations', this.search).then(response => {
                        this.$router.push({ name: 'RecommendationList', id: response.body.id})
                    }, response => {
                        this.feedback = "Your request could not be processed correctly";
                    });
                } else {
                    this.feedback = "Por favor, rellena todos los datos"
                }
            },
            getSelects() {
                this.cities = this.getCityChoices()
                this.users = this.getUserChoices()
                this.contexts = this.getContextChoices()
            }
        },
        created: function() {
            this.loading = true;
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
