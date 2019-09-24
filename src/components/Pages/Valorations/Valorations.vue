<template>
    <div class="d-flex align-items-center">
        <b-container>
            <b-row class="header-infos">
                <b-col class="mb-4 mt-4">
                    <span class="title">Valoraciones</span>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="6" class="text-center">
                    <span class="subtitle">Valoraciones de ítems</span>
                    <b-col v-for="(item, index) in items" :key="item.id">
                        <item-card :data="item"></item-card>
                    </b-col>
                </b-col>
                <b-col cols="6" class="text-center">
                    <span class="subtitle">Recomendaciones</span>
                    <b-col v-for="(recommendation, index) in recommendations" :key="recommendation.id">
                        <recommendation-card :data="recommendation"></recommendation-card>
                    </b-col>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'Valorations',
        data () {
            return {
                items: [],
                recommendations: [],
            }
        },
        methods: {
            getItems() {
                this.apiGet('items').then(response => {
                    this.items = response.data
                }, response => {});
            },
            getRecommendations() {
                this.apiGet('recommendations').then(response => {
                    this.recommendations = response.data
                }, response => {});
            },
        },
        created: function() {
            this.getItems();
            this.getRecommendations();
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import 'src/assets/css/global.scss';

    @media (min-width: 1600px){
        .container {
            max-width: 1400px;
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
    }

    .subtitle {
        font-size: 24px;
        font-weight: bold;
    }

</style>
