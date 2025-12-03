<template>
    <div class="d-flex align-items-center">
        <b-container>
            <b-row class="header-infos">
                <b-col class="mb-4">
                    <span class="title">Preferencias</span>
                </b-col>
            </b-row>
            <b-row v-if="ready" v-for="i in rowCount" :key="i">
                <b-col cols="6" v-for="(context, index) in context_segments.slice((i - 1) * 2, i * 2)" :key="context.id">
                    <preference-card :data="context"></preference-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'Preferences',
        data () {
            return {
                context_segments: [],
                ready: false,
            }
        },
        computed:{
           rowCount() {
              return Math.ceil(this.context_segments.length / 2);
           }
        },
        methods: {
            getSegmentContexts() {
                this.apiGet('context_segments').then(response => {
                    this.context_segments = response.data
                    this.ready = true
                }, response => {});
            },
        },
        created: function() {
            this.getSegmentContexts();
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
    }

</style>
