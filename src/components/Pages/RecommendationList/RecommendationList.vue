<template>
    <div class="d-flex align-items-center">
        <b-container>
            <div class="header-infos">

            </div>
            <b-row v-for="(item, index) in items" :key="item.id">
                <item-card :id="item.id" :data="item"/>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import ItemCard from '@/components/utils/misc/ItemCard'

    export default {
        name: 'RecommendationList',
        component: { 'item-card': ItemCard },
        data () {
            return {
                items: []
            }
        },
        methods: {
            getRecommendation() {
                this.apiGet('recommendations/' + this.$route.params.id).then(response => {
                    this.items = response.data.items
                    this.infos = response.data
                }, response => {});
            },
            created: function() {
                this.getRecommendation();
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import 'src/assets/css/global.scss';

    .reommendation-list {
        width: 100%;
        min-height: 100vh;
        background-color: $white;
        text-align: center;
        .header-infos {
            text-align: center;
            margin-bottom: 10px;
        }
    }

</style>
