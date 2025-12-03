<template>
    <div class="d-flex align-items-center">
        <b-container>
            <b-row class="header-infos">
                <b-col class="mt-5 mb-4">
                    <span class="title">Historial de recomendaciones</span>
                </b-col>
            </b-row>
            <b-row v-for="(recommendation, index) in recommendations" :key="recommendation.id">
                <recommendation-card :data="recommendation"/>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'Historic',
        data () {
            return {
                recommendations: [],
            }
        },
        methods: {
            getRecommendations() {
                this.apiGet('recommendations').then(response => {
                    this.recommendations = response.data
                }, response => {});
            },
        },
        created: function() {
            this.getRecommendations();
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
